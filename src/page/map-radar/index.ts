import { DataHelper } from './../../utils/data-helper';
import { PATH } from './../../constant/route-constant';
import { getGeoJson } from './../../utils/location-helper';
import { STATION } from '@/constant/forcast-station-constant';
import { WeatherServices } from '@/service/weather-service/weather.service';
import Vue from 'vue';
import Component from "vue-class-component";
import moment from 'moment';
import { ICON } from '@/constant/icon-constant';
import { sleep } from '@/utils/common-utils';
import { Watch } from 'vue-property-decorator';
import { IForecastSearchParam, ForecastSearchParam } from '@/model/forecast';
import { WEATHER_TYPE } from '@/constant/forcast-station-constant';
import vietnam_image from '/static/img/video/vietnam.png';
import btb_image from '/static/img/video/BTB.png';
import ntb_image from '/static/img/video/NTB.png';
import vl_image from '/static/img/video/VL.png';

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
        "qr-code": () => import("./components/qr-code/QRCodeComponent.vue"),
        "video-forecast": () => import("./components/video-forecast/VideoForecastComponent.vue"),
        "video-forecast-province": () => import("./components/video-forecast-province/VideoForecastProvinceComponent.vue"),
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
    customWaitControl: any = 1000;

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

    centerLatlng: any = null

    isDisplayFake: boolean = false;
    fakeImage: any = vietnam_image;
    vietnam: any = vietnam_image;
    btb: any = btb_image;

    mapTitle: any = {};
    isShowMapTitle: boolean = false;
    isShowVideoForecase: boolean = false;
    boxData: string = null;

    provinceData: string = null;
    isShowVideoForecaseProvince: boolean = false;
    videoForecastAnimation: string = ''
    isProvinceData: boolean = false;

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

    async handleResetLayer() {
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
        if (this.videoForecastAnimation.includes('right')) {
            this.videoForecastAnimation = 'right animate__fadeOutRightBig'
        } else {
            this.videoForecastAnimation = 'left animate__fadeOutLeftBig'
        }
        await sleep(500, this.clearTimeout);
        this.isShowMapTitle = false;
        this.isShowVideoForecase = false;
        this.boxData = null;
        this.isShowVideoForecaseProvince = false;
        this.provinceData = null;

    }

    getFakeImage(placeId) {

        switch (placeId) {
            case 'TBB':
                this.fakeImage = vietnam_image;
                break;
            case 'NTB':
                this.fakeImage = btb_image;
                break;
            case 'DNB':
                this.fakeImage = ntb_image;
                break;
            case 'TQ':
                this.fakeImage = vl_image;
                break;
            default:
                break;
        }
    }

    getMapTtile(mapData) {
        switch (mapData.placeId) {
            case 'TQ':
                this.mapTitle = {
                    name: 'Toàn Quốc',
                    position: 'right animate__fadeInRightBig'
                }
                this.videoForecastAnimation = 'right'
                break;
            case 'TNB':
                this.mapTitle = {
                    name: mapData.name,
                    position: mapData.titlePosition ? mapData.titlePosition : 'right animate__fadeInRightBig'
                }
                this.videoForecastAnimation = 'tnb-right'
                break;
            case 'VL':
                this.mapTitle = {
                    name: mapData.name,
                    position: mapData.titlePosition ? mapData.titlePosition : 'left animate__fadeInLeftBig'
                }
                this.videoForecastAnimation = 'vl-left'
                break;
            default:
                this.mapTitle = {
                    name: mapData.name,
                    position: mapData.titlePosition ? mapData.titlePosition : 'right animate__fadeInRightBig'
                }
                this.videoForecastAnimation = this.mapTitle.position === 'right animate__fadeInRightBig' ? 'right' : 'left'
                break;
        }
    }

    async displayEachProvince(placeId) {
        await sleep(3000, this.clearTimeout);
        this.mapTitle = {
            ...this.mapTitle,
            position: this.mapTitle.position === 'right animate__fadeInRightBig' ? 'right animate__fadeOutRightBig' : 'left animate__fadeOutLeftBig'
        };

        await sleep(500, this.clearTimeout);
        this.isShowMapTitle = false;
        this.isShowVideoForecase = false;
        this.boxData = null;
        this.provinceData = placeId;
        this.isShowVideoForecaseProvince = true;

    }

    async handleChangeRegion(mapData) {
        // document.querySelector('.particles-layer').classList.add('hide-animation')
        this.isProvinceData = false;
        this.getFakeImage(mapData.placeId);
        await sleep(500, this.clearTimeout);
        this.menuClick = false;
        const { map } = this.windy;

        //@ts-ignore
        this.regionGroup = new L.LayerGroup();

        const geojson = mapData.geojson ? JSON.parse(mapData.geojson) : null;
        //@ts-ignore
        const layer = geojson ? L.geoJSON(geojson, { style: mapData.style }) : null;

        if (mapData.placeId !== 'TQ') this.regionGroup.addLayer(layer);
        let duration = 2;
        let method = 'flyToBounds';
        let destination = layer ? layer.getBounds() : null;
        if (mapData.placeId === 'TBB' || mapData.placeId === 'NTB' || mapData.placeId === 'DNB' || mapData.placeId === 'TQ') {
            this.isDisplayFake = true;
            await sleep(500, this.clearTimeout);
            method = 'flyToBounds';
            duration = 0.5;
        };
        if (mapData.placeId === 'TNB') {
            method = 'panTo';
            destination = {
                lat: 9.9718322535197,
                lng: 106.70196533203125
            }
        };
        if (mapData.placeId === 'TQ') {
            const VietNamGeojson = await getGeoJson('nation', 'viet_nam');
            //@ts-ignore
            const vnBorder = L.geoJSON(VietNamGeojson);
            map.fitBounds(vnBorder.getBounds(), { maxZoom: 12 });
            await sleep(500, this.clearTimeout);
            this.isDisplayFake = false;
            this.getMapTtile(mapData);
            this.boxData = DataHelper.deepClone(mapData.placeId);
            console.log(this.boxData);
            this.isShowMapTitle = true;
            return;
        }
        if (this.centerLatlng) {
            const distance = map.distance(this.centerLatlng, layer.getBounds().getCenter())
            if (distance >= 800000) {
                duration = 8
            }
        }
        map[method](destination, {
            maxZoom: mapData.zoom ? mapData.zoom : null,
            animate: true,
            duration,
            easeLinearity: 0.2,
            paddingBottomRight: mapData.paddingBottomRight ? mapData.paddingBottomRight : [0, 0],
            paddingTopLeft: mapData.paddingTopLeft ? mapData.paddingTopLeft : [0, 0]
        });

        await sleep(duration * 1000, this.clearTimeout);

        const provinces = JSON.parse(mapData.province);
        this.addProvinceLayer(provinces);

        if (mapData.zoom) {
            await sleep(500, this.clearTimeout);
            this.centerLatlng = map.getBounds().getCenter();
            console.log(this.centerLatlng);

            map.flyTo(this.centerLatlng, mapData.zoom, { animate: true, duration: 1.5, easeLinearity: 0.2 })
            this.layerGroup.addLayer(this.regionGroup);
        }
        await sleep(500, this.clearTimeout);
        this.addPopUPLayer(mapData.provinceIds, mapData.placeId === 'NTB', mapData.animation);

        await sleep(1000, this.clearTimeout);
        // document.querySelector('.particles-layer').classList.remove('hide-animation')
        this.isDisplayFake = false;
        await sleep(500, this.clearTimeout);
        this.getMapTtile(mapData);
        this.boxData = DataHelper.deepClone(mapData.placeId);
        this.isShowMapTitle = true;
        this.isShowVideoForecase = true;
        this.displayEachProvince(mapData.placeId);
    }

    async handleChangeLocation(mapData) {
        this.isProvinceData = true;
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
        let duration = 2;
        if (this.centerLatlng) {
            const distance = map.distance(this.centerLatlng, provinceLayer.getBounds().getCenter())
            if (distance >= 800000) {
                map.flyTo(this.centerLatlng, 10, { animate: true, duration: 5, easeLinearity: 2 })
                await sleep(5000, this.clearTimeout);
                duration = 8
            }
        }
        map.flyToBounds(provinceLayer.getBounds(), {
            maxZoom: mapData.zoom,
            animate: true, duration,
            easeLinearity: 2,
            paddingBottomRight: mapData.paddingBottomRight ? mapData.paddingBottomRight : [0, 0],
            paddingTopLeft: mapData.paddingTopLeft ? mapData.paddingTopLeft : [0, 0]
        });
        await sleep(duration * 1000, this.clearTimeout);
        const districts = JSON.parse(mapData.district);
        this.getMapTtile(mapData);
        this.addDistrictLayer(districts);
        this.addPopUPLayer(mapData.districtIds);
        this.layerGroup.addLayer(this.layerProvice);
        this.forecastData = STATION.find(x => x.place_id === mapData.placeId);
        this.centerLatlng = provinceLayer.getBounds().getCenter();

        this.isShowMapTitle = true;
        this.boxData = DataHelper.deepClone(mapData.placeId);
        this.isShowVideoForecase = true;
        this.displayEachProvince(mapData.districtIds);
    }

    addDistrictLayer(districts) {
        districts.forEach((element, index) => {
            //@ts-ignore
            const layer = L.geoJSON(element, {
                style: {
                    color: COLOR[index],
                    weight: 0,
                    opacity: 0,
                    fillOpacity: 0.5,
                    className: 'geojson'
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

    async addPopUPLayer(ids, size = false, animation = 'animate__bounceInDown') {
        if (!ids) return;
        const vm = this as any;
        // @ts-ignore
        this.layerPopup = new L.LayerGroup();
        this.layerGroup.addLayer(this.layerPopup);

        const returnPromise = await this.getHorizontal(ids);
        const tempArray = returnPromise[0];
        const iconArray = returnPromise[1];

        for (const element of ids) {
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
                const layer = L.popup({ closeOnClick: false, closeButton: false, autoClose: true, autoPan: false })
                    .setLatLng([station.y, station.x])
                    .setContent(`<div class="map-pop-up animate__animated ${animation} ${size ? 'small' : ''}">
                            <div class="map-pop-up-name">${station.ten}</div>
                            <div class="map-pop-up-data">
                                <div class="map-pop-up-data--image"><img src="${iconUrl.url}"/></div>
                                <div class="map-pop-up-data--temp">${temp}°C</div>
                            </div>
                        </div>`)
                await sleep(500, this.clearTimeout);
                this.layerPopup.addLayer(layer);
            }
        }

    }

    getDisplayData(data, date, time) {
        return DataHelper.getDataByDateHour(data, date, time);
    }

    async capture() {
        this.isRecording = true;
        const vm = this as any;
        //@ts-ignore
        return await navigator.mediaDevices.getDisplayMedia({
            video: {
                width: { ideal: 1280 },
                height: { ideal: 720 },
                mediaSource: "screen", cursor: false
            }
        })
            .then(function (stream) {
                //@ts-ignore
                vm.videoStream = new MediaRecorder(stream);
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
                vm.videoStream.onerror = () => {
                    vm.isRecording = false;
                };
                vm.videoStream.start();
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
            await sleep(2000, this.clearTimeout);
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
        this.isShowButtonStop = false;
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

        localStorage.setItem('settings_particles', '{"multiplier":0.8,"velocity":1.8,"width":0.5,"blending":0.93,"opacity":0.6}')
        localStorage.setItem('settings_lang', '"vi"')
        // @ts-ignore
        windyInit(options, async windyAPI => {
            // windyAPI is ready, and contain 'map', 'store',
            // 'picker' and other usefull stuff
            this.windy = windyAPI;
            const { map, overlays, store } = this.windy;
            const levels = store.getAllowed('availLevels');
            console.log(levels);

            //@ts-ignore
            L.gridLayer({ updateWhenZooming: true, updateWhenIdle: true, noWrap: true, keepBuffer: 5000 })

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
                    weight: 2,
                    opacity: 0.5,
                    fillOpacity: 0
                }
            });
            map.fitBounds(vnBorder.getBounds(), { maxZoom: 12, duration: 1.5, easeLinearity: 0.2 });
            map.invalidateSize()
            this.layerGroup.addLayer(vnBorder);
            this.layerGroup.addTo(map);
            // setInterval(function () {
            //     map.invalidateSize();
            // }, 100);
        });
    }

    handleRemote({ scenario, message }) {
        this.$toast.info(`Bắt đầu điều khiển: ${scenario.scenarioName}`);
        this.isRecording = true;
        this.isShowButtonStop = true;
        this.isReview = true;
        const send = {
            event: 'SUCCESS',
            requestID: message.requestID
        }
        this.$socket.sendMessage(JSON.stringify(send));
    }

    handleMove({ step, message }) {
        this[step.action] = step;
        const send = {
            event: 'SUCCESS',
            requestID: message.requestID
        }
        this.$socket.sendMessage(JSON.stringify(send));
    }


    @Watch('customZoomControl')
    handleZoomMap(val) {
        const { map } = this.windy;
        this.handleResetLayer();
        map.flyTo(this.centerLatlng, val.data, { animate: true, duration: 2.5, easeLinearity: 0.2 })

    }

    @Watch('customLevelControl')
    handleChangeElevation(val) {
        this.handleChangeLevel(val.data);
    }

    @Watch('customWaitControl')
    async handleWait(val) {
        if (val) {
            await sleep(val.data, this.clearTimeout);
        }
    }
}
