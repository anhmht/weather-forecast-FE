import { PATH } from './../../constant/route-constant';
import { getGeoJson } from './../../utils/location-helper';
import { STATION } from '@/constant/forcast-station-constant';
import { WeatherServices } from '@/service/weather-service/weather.service';
import Vue from 'vue';
import Component from "vue-class-component";
import { DataHelper } from '@/utils/data-helper';
import moment from 'moment';
import { ICON } from '@/constant/icon-constant';
import { sleep } from '@/utils/common-utils';
import { Watch } from 'vue-property-decorator';
import { IForecastSearchParam, ForecastSearchParam } from '@/model/forecast';
import { WEATHER_TYPE } from '@/constant/forcast-station-constant';

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
        "scenario-modal": () => import("./components/scenario/ScenarioComponent.vue"),
        "qr-code": () => import("./components/qr-code/QRCodeComponent.vue")
    }
})
export default class HomePageComponent extends Vue {
    windy: any;
    media: any = null;
    videoStream: any = null;
    isRecording: boolean = false;
    isReview: boolean = false;
    isHideIconPicker: boolean = true;
    isDisplayDialog: boolean = false;
    visibleQR: boolean = false;
    weatherService: WeatherServices = new WeatherServices();
    searchParam: IForecastSearchParam = new ForecastSearchParam();

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
    isShowButtonStop: boolean = false;

    drawer: boolean = false;

    districtIds: any = [];
    context = {
        icon: [],
        temp: [],
        station: []
    }
    isWebView: boolean = false;
    menuClick: boolean = false;

    handleBack() {
        this.$router.push(PATH.INFO);
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
                                <div class="map-pop-up-data--temp">${temp}°C</div>
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
        const { store } = this.windy;
        store.set("level", data);
    }

    getHorizontal(ids) {
        let stationId: any = [];
        ids.forEach(element => {
            const station = STATION.find(x => x.place_id === element);
            if (station) {
                stationId.push(station.id);
            }
        });

        this.searchParam = new ForecastSearchParam();
        this.searchParam.stationIds = stationId;
        this.searchParam.fromDate = moment().format("YYYY-MM-DD");
        this.searchParam.toDate = moment().format("YYYY-MM-DD");
        this.searchParam.weatherTypes = [
            WEATHER_TYPE.Temperature,
            WEATHER_TYPE.Weather
        ];

        return new Promise((resolve, reject) => {
            this.weatherService.getHorizontal(this.searchParam).then((res: any) => {
                let tempArray = res.getWeatherInformationHorizontals.filter(x => x.weatherType === WEATHER_TYPE.Temperature);
                let iconArray = res.getWeatherInformationHorizontals.filter(x => x.weatherType === WEATHER_TYPE.Weather);

                resolve([tempArray, iconArray]);
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
        this.menuClick = false;
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
            map.setZoom(this.isWebView ? mapData.zoom -1 : mapData.zoom)
        }
    }

    async handleChangeLocation(mapData) {
        this.menuClick = false;
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
        if (!ids) return;
        const vm = this as any;
        // @ts-ignore
        this.layerPopup = new L.LayerGroup();
        this.layerGroup.addLayer(this.layerPopup);

        const returnPromise = await this.getHorizontal(ids);
        const tempArray = returnPromise[0];
        const iconArray = returnPromise[1];

        ids.forEach(async element => {
            const station = STATION.find(x => x.place_id === element);
            if (station) {
                const contextTemp = tempArray.find(x => x.stationId === station.id);
                const contextIcon = iconArray.find(x => x.stationId === station.id);
                this.context.temp.push(contextTemp);
                this.context.icon.push(contextIcon);
                this.context.station.push(station);
                const temp = vm.getDisplayData(contextTemp, 0, moment().hour())
                const icon = vm.getDisplayData(contextIcon, 0, moment().hour())
                const iconUrl = ICON.find(x => x.id === icon)
                // @ts-ignore
                const layer = L.popup({ closeOnClick: false })
                    .setLatLng([station.y, station.x])
                    .setContent(`<div class="map-pop-up">
                            <div class="map-pop-up-name">${station.ten}</div>
                            <div class="map-pop-up-data">
                                <div class="map-pop-up-data--image"><img src="${iconUrl.url}"/></div>
                                <div class="map-pop-up-data--temp">${temp}°C</div>
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
        return await navigator.mediaDevices.getDisplayMedia({ video: { mediaSource: "screen", cursor: false } })
            .then(function (stream) {
                //@ts-ignore
                vm.videoStream  = new MediaRecorder(stream);
                const chunks = [];
                vm.videoStream.ondataavailable = e => chunks.push(e.data);
                stream.getVideoTracks()[0].onended = () => {
                    // Click on browser UI stop sharing button
                    console.info("Recording has ended");
                    setTimeout(() => {
                        vm.handleClearTimeout(true);
                        const completeBlob = new Blob(chunks, {
                            type: chunks[0].type
                        });
                        vm.isDisplayDialog = true;
                        vm.media = URL.createObjectURL(completeBlob);
                        vm.isRecording = false;

                    }, 500);
                };
                vm.videoStream.onstop = e => {
                    const completeBlob = new Blob(chunks, {
                        type: chunks[0].type
                    });
                    vm.isDisplayDialog = true;
                    vm.media = URL.createObjectURL(completeBlob);
                    vm.isRecording = false;

                    stream.getTracks().forEach(track => track.stop())
                };
                vm.videoStream .onerror = () => {
                    vm.isRecording = false;
                };
                vm.videoStream .start();
            })
            .catch(err => {
                this.handleClearTimeout()
                vm.isRecording = false;
            });
    }

    handleOpenScenario() {
        this.drawer = true;
    }

    async handlePreview(previewData, isRecord = false) {
        clearTimeout(this.clearTimeout.timeout);
        this.isStop = false;
        this.isRecording = true;
        if (isRecord) {
            await this.capture();
        } else {
            this.isShowButtonStop = true;
            this.isReview = true;
        }
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
        if (!isRecord) {
            this.isReview = false;
            this.drawer = true;
        } else {
            this.videoStream.stop();
        }
        this.isShowButtonStop = false;
    }

    handleClearTimeout(isRecord = false) {
        clearTimeout(this.clearTimeout.timeout);
        this.isRecording = false;
        this.isStop = true;
        if (!isRecord) {
            this.drawer = true;
        }
    }

    created() {
        const webView = (this as any).$route.query.isWebview;
        this.isWebView = webView ? true : false;
        console.log(this.isWebView);

    }

    async mounted() {
        // this.currentPosition = await displayLocation() as any;
        const options = {
            // Required: API key
            key: "PsLAtXpsPTZexBwUkO7Mx5I", // REPLACE WITH YOUR KEY !!!
            // key: 'yw7vbuA1PQmaUPe0SNECjxmOIv5AJ4FC', // Production Github Page !!!
            // key: 'oixjdU358Nvzz8CGDQhcBAswQ2ngOshM', // Production Azure web static!!!
            // Put additional console output
            // verbose: true,
            // Optional: Initial state of the map
            zoom: 7,
        };

        localStorage.setItem('settings_particles', '{"multiplier":1,"velocity":1.4,"width":0.75,"blending":1.08,"opacity":1.8}')
        localStorage.setItem('settings_lang', '"vi"')
        // @ts-ignore
        windyInit(options, async windyAPI => {
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
            map.baseLayer.setUrl("https://{s}.google.com/vt/lyrs=y&hl=vi&x={x}&y={y}&z={z}",
                {
                    attribution: "Trung tâm thông tin & dữ liệu KTTV",
                    maxZoom: 16,
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
            map.flyToBounds(vnBorder.getBounds(), { maxZoom: 12, duration: 1.5, easeLinearity: 0.2 });
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
