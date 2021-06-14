import { getGeoJson } from './../../utils/location-helper';
// import { displayLocation } from '@/utils/location-helper';
import { STATION } from '@/constant/forcast-station-constant';
import { ForecastServices } from '@/service/forecast-service/forecast.service';
import Vue from 'vue';
import Component from "vue-class-component";
import { DataHelper } from '@/utils/data-helper';
import moment from 'moment';
import { ICON } from '@/constant/icon-constant';
import { sleep } from '@/utils/common-utils';
import { Watch } from 'vue-property-decorator';

const COLOR = [
    'red', 'green', 'blue', 'yellow', 'DeepPink', 'DeepSkyBlue', 'GreenYellow', 'Lime', 'Thistle', 'NavajoWhite',
    'MidnightBlue', 'orange', 'purple', 'aqua', 'Aquamarine', 'RoyalBlue', 'Teal', 'DarkGreen', 'Salmon'
]
@Component({
    template: require("./template.html").default,
    components: {
        "icon-picker": () => import("./components/icon-drag-drop/IconDragDropComponent.vue"),
        "map-type-picker": () => import("./components/map-type/MapTypeComponent.vue"),
        "location-picker": () => import("./components/location/LocationComponent.vue"),
        "tool-bar": () => import("./components/weather-tool/WeatherToolComponent.vue"),
        "elevation-picker": () => import("./components/elevation/ElevationComponent.vue"),
        "scenario-modal": () => import("./components/scenario/ScenarioComponent.vue")
    }
})
export default class HomePageComponent extends Vue {
    windy: any;
    media: any = null;
    isRecording: boolean = false;
    isReview: boolean = false;
    isHideIconPicker: boolean = true;
    isDisplayDialog: boolean = false;
    forecastService: ForecastServices = new ForecastServices();

    layerGroup: any;
    layerProvice: any;
    layerPopup: any;
    regionGroup: any;

    currentPosition = null;
    forecastData: any = null;

    customLocationControl: any = null;
    customLevelControl: any = 0;
    customMapStatusControl: any = null;
    customZoomControl: any = 6;
    clearTimeout: any = {
        timeout: null,
    }
    isStop: boolean = false;

    drawer: boolean = false;

    districtIds:any = [];
    context = {
        icon: [],
        temp: [],
        station: []
    }

    handleBack() {
        this.$router.go(-1);
    }

    updateDistrictPopUp(changeTime) {
        if (this.layerPopup) {
            Object.keys(this.layerPopup._layers).forEach((element, index) => {
                const temp = this.getDisplayData(this.context.temp[index], changeTime.date, changeTime.time);
                const icon = this.getDisplayData(this.context.icon[index], changeTime.date, changeTime.time);
                const iconUrl = ICON.find(x => x.id === icon);
                const station = this.context.station[index];
                this.layerPopup._layers[element].setContent(`<div class="map-pop-up">
                            <div class="map-pop-up-name">${station.ten}</div>
                            <div class="map-pop-up-data">
                                <div class="map-pop-up-data--image"><img src="${iconUrl.url}"/></div>
                                <div class="map-pop-up-data--temp">${temp}℃</div>
                            </div>
                        </div>`);
                this.layerPopup._layers[element].update();
            });
        }
    }

    handleDownload() {
        const link = document.createElement("a");
        link.href = this.media;
        link.setAttribute("download", "test-video"); //or any other extension
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    handleChangeMap(mapData) {
        const { store } = this.windy;
        store.set("overlay", mapData.type);
    }

    handleChangeLevel(data) {
        console.log(data);

        const { store } = this.windy;
        store.set("level", data);
    }

    getTemprature(station) {
        return new Promise((resolve, reject) => {
            this.forecastService.getTemperatureByStation(station.id).then((res) => {
                resolve(res);
            }).catch(err => {
                console.log(err);
            })
        })
    }

    getIcon(station) {
        return new Promise((resolve, reject) => {
            this.forecastService.getIconWeather(station.id).then((res) => {
                resolve(res);
            }).catch(err => {
                console.log(err);
            })
        })
    }

    handleResetLayer() {
        if (this.regionGroup) {
            this.layerGroup.removeLayer(this.regionGroup);
            this.regionGroup = null;
        }
        if (this.layerProvice) {
            this.layerGroup.removeLayer(this.layerProvice);
            this.layerProvice = null;
        }
        if (this.layerPopup) {
            this.layerGroup.removeLayer(this.layerPopup);
            this.layerPopup = null;
        }
        this.context = {
            icon: [],
            temp: [],
            station: []
        }
        this.forecastData = null;
    }

    async handleChangeRegion(mapData) {
        const { map } = this.windy;
        //@ts-ignore
        this.regionGroup = new L.LayerGroup();

        const geojson = JSON.parse(mapData.geojson);
        //@ts-ignore
        const layer = L.geoJSON(geojson, { style: mapData.style })
        this.regionGroup.addLayer(layer);
        map.flyToBounds(layer.getBounds(), { maxZoom: mapData.zoom, animate: true, duration: 1, easeLinearity: 1 });
        await sleep(1000, this.clearTimeout);
        const provinces = JSON.parse(mapData.province);
        this.addProvinceLayer(provinces);
        this.addPopUPLayer(mapData.provinceIds);
        this.layerGroup.addLayer(this.regionGroup);
        if (mapData.zoom) {
            map.setZoom(mapData.zoom)
        }
    }

    async handleChangeLocation(mapData) {
        const { map } = this.windy;
        //Remove geojson layer
        // Move map with Geojson data
        const geojson = JSON.parse(mapData.geojson);
        //@ts-ignore
        this.layerProvice = new L.LayerGroup();
        //@ts-ignore
        const provinceLayer = L.geoJSON(geojson, { style: mapData.style })
        this.layerProvice.addLayer(provinceLayer);
        map.flyToBounds(provinceLayer.getBounds(), { maxZoom: mapData.zoom, duration: 1.5, easeLinearity: 0.2 });
        const districts = JSON.parse(mapData.district);
        this.addDistrictLayer(districts);
        this.addPopUPLayer(mapData.districtIds);
        this.layerGroup.addLayer(this.layerProvice);
        this.forecastData = STATION.find(x => x.place_id === mapData.placeId);
    }

    addDistrictLayer(districts) {
        districts.forEach((element, index) => {
            //@ts-ignore
            const layer = L.geoJSON(element, {
                style: {
                    color: COLOR[index],
                    weight: 1,
                    opacity: 1,
                    fillOpacity: 0.5
                }
            })
            this.layerProvice.addLayer(layer);
        });
    }

    addProvinceLayer(provinces) {
        provinces.forEach((element, index) => {
            //@ts-ignore
            const layer = L.geoJSON(element, {
                style: {
                    color: COLOR[index],
                    weight: 1,
                    opacity: 1,
                    fillOpacity: 0.5
                }
            })
            this.regionGroup.addLayer(layer);
        });
    }

    async addPopUPLayer(ids) {
        if(!ids) return;
        const vm = this as any;
        // @ts-ignore
        this.layerPopup = new L.LayerGroup();
        this.layerGroup.addLayer(this.layerPopup);
        ids.forEach(async element => {
            const station = STATION.find(x => x.place_id === element);
            if (station) {
                const contextTemp = await this.getTemprature(station);
                const contextIcon = await this.getIcon(station);
                this.context.temp.push(contextTemp);
                this.context.icon.push(contextIcon);
                this.context.station.push(station);
                const temp = vm.getDisplayData(contextTemp, 0, moment().hour())
                const icon = vm.getDisplayData(contextIcon, 0, moment().hour())
                const iconUrl = ICON.find(x => x.id === icon)
                // @ts-ignore
                const layer = L.popup({ closeOnClick: false})
                    .setLatLng([station.y, station.x])
                    .setContent(`<div class="map-pop-up">
                            <div class="map-pop-up-name">${station.ten}</div>
                            <div class="map-pop-up-data">
                                <div class="map-pop-up-data--image"><img src="${iconUrl.url}"/></div>
                                <div class="map-pop-up-data--temp">${temp}℃</div>
                            </div>
                        </div>`)
                this.layerPopup.addLayer(layer);
            }
        });

    }

    getDisplayData(data, date, time) {
        return DataHelper.getDataByDateHour(data, date, time);
    }

    async capture() {
        this.isRecording = true;
        const vm = this as any;
        //@ts-ignore
        navigator.mediaDevices.getDisplayMedia({ video: { mediaSource: "screen", cursor: false } })
            .then(function (stream) {
                //@ts-ignore
                let recorder = new MediaRecorder(stream);
                const chunks = [];
                recorder.ondataavailable = e => chunks.push(e.data);
                stream.getVideoTracks()[0].onended = () => {
                    // Click on browser UI stop sharing button
                    console.info("Recording has ended");
                    setTimeout(() => {
                        const completeBlob = new Blob(chunks, {
                            type: chunks[0].type
                        });
                        vm.isDisplayDialog = true;
                        vm.media = URL.createObjectURL(completeBlob);
                        vm.isRecording = false;
                    }, 500);
                };
                recorder.onended = e => { };
                recorder.onerror = () => {
                    vm.isRecording = false;
                };
                recorder.start();
            })
            .catch(err => {
                vm.isRecording = false;
            });
    }

    handleOpenScenario() {
        this.drawer = true;
    }

    async handlePreview(previewData) {
        clearTimeout(this.clearTimeout.timeout);
        this.isStop = false;
        this.isRecording = true;
        this.isReview = true;
        for (const iterator of previewData) {
            if (this.isStop) {
                this.isStop = false;
                break;
            }
            this[iterator.action] = iterator;
            if (this.isStop) {
                this.isStop = false;
                break;
            }
            await sleep(iterator.duration, this.clearTimeout);
            if (this.isStop) {
                this.isStop = false;
                break;
            }
        }
        this.isRecording = false;
        this.isReview = false;
        this.drawer = true;
    }

    handleClearTimeout() {
        clearTimeout(this.clearTimeout.timeout);
        this.isRecording = false;
        this.drawer = true;
        this.isStop = true;
    }

    async mounted() {
        // this.currentPosition = await displayLocation() as any;
        const options = {
            // Required: API key
            key: "PsLAtXpsPTZexBwUkO7Mx5I", // REPLACE WITH YOUR KEY !!!
            // key: 'yw7vbuA1PQmaUPe0SNECjxmOIv5AJ4FC', // Production !!!
            // Put additional console output
            // verbose: true,
            // Optional: Initial state of the map
            lat: 16.06778,
            lon: 108.22083,
            zoom: 7,
        };

        localStorage.setItem('settings_particles', '{"multiplier":1,"velocity":1.4,"width":0.75,"blending":1.08,"opacity":1.8}')
        localStorage.setItem('settings_lang', '"vi"')
        // @ts-ignore
        windyInit(options,async windyAPI => {
            // windyAPI is ready, and contain 'map', 'store',
            // 'picker' and other usefull stuff
            this.windy = windyAPI;
            const { map, overlays, store } = this.windy;
            const levels = store.getAllowed('availLevels');
            console.log(levels);

            overlays.wind.setMetric('km/h');
            map.setZoom(this.customZoomControl);
            //@ts-ignore
            let topLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
            topLayer.setOpacity('0');

            map.baseLayer.options.subdomains = ["mt0", "mt1", "mt2", "mt3"];
            map.options.minZoom = 4;
            map.options.maxZoom = 18;
            map.baseLayer.setUrl(
                "https://stamen-tiles-{s}.a.ssl.fastly.net/toner-lines/{z}/{x}/{y}.png"
            );
            map.baseLayer.setUrl("https://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}",
                {
                    attribution: "Trung tâm thông tin & dữ liệu KTTV",
                    minZoom: 4,
                    maxZoom: 16
                });
            map.baseLayer.setOpacity(0.5);
            map.on('zoomend', function () {
                if (map.getZoom() >= 12) {
                    topLayer.setOpacity('1');
                } else {
                    topLayer.setOpacity('0');
                }
            });
            // Remove Windy city labels
            //@ts-ignore
            map.removeLayer(W.labelsLayer);

            //@ts-ignore
            this.layerGroup = new L.LayerGroup();

            const VietNamGeojson = await getGeoJson('nation', 'viet_nam');
            //@ts-ignore
            const vnBorder = L.geoJSON(VietNamGeojson, {
                style: {
                    color: "#fff",
                    weight: 1,
                    opacity: 1,
                    fillOpacity: 0.2
                }
            });
            this.layerGroup.addLayer(vnBorder);
            this.layerGroup.addTo(map);
        });
    }

    @Watch('customZoomControl')
    handleZoomMap(val) {
        const { map } = this.windy;
        map.setZoom(val.data);
    }

    @Watch('customLevelControl')
    handleChangeElevation(val) {
        this.handleChangeLevel(val.data);
    }
}
