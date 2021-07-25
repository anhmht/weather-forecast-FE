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
import { Getter, namespace } from 'vuex-class';
import { storeModules } from '@/store';
import userTypesStore from '@/store/user/user-types.store';
import { USER_ROLE } from '@/constant/common-constant';
// import * as htmlToImage from 'html-to-image';
import { SCENARIO_ACTION_DETAIL_ENUM } from './components/scenario/scenario-default';
// import * as HME from "h264-mp4-encoder";


const UserGetter = namespace(storeModules.User, Getter);

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
        "text-box": () => import("./components/text-box/TextBoxComponent.vue"),
        "video-map-title": () => import("./components/video-map-title/VideoMapTitleComponent.vue"),
        "custom-temp-info": () => import("./components/custom-video-forecast-province/CustomVideoForecastProvince.vue"),
        "windy-setting": () => import("./components/windy-setting/WindySettingComponent.vue"),
    },
    methods: {
        pushTextBox(element) {
            (this.$refs.textBox as any).handleRenderTextBox(element);
        },
        displayMapTitle(element) {
            (this.$refs.mapTitle as any).renderMapTitle(element);
        },
        displayTempInfo(element) {
            (this.$refs.tempInfo as any).renderProvinceData(element);
        }
    }
})
export default class HomePageComponent extends Vue {
    windy: any;
    media: any = null;
    player: any = null
    videoStream: any = null;
    isRecording: boolean = false;
    isReview: boolean = false;
    isRemote: boolean = false;
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
    fakeImage: any = null;

    mapTitle: any = {};
    isShowMapTitle: boolean = false;
    isShowVideoForecase: boolean = false;
    boxData: string = null;

    provinceData: string = null;
    isShowVideoForecaseProvince: boolean = false;
    videoForecastAnimation: string = ''
    isProvinceData: boolean = false;
    videoLayout: string = 'default';


    isShowTextBox: boolean = false;

    @UserGetter(userTypesStore.Get.Auth) userConfig: Object;

    get hasPermission () {
        if (this.userConfig && this.userConfig['roles']) {
            return !!this.userConfig['roles'].find(r => r === USER_ROLE.SUPER || r === USER_ROLE.DTH);
        }
        return false;
    }

    get windySetting () {
        let setting = localStorage.getItem('settings_particles');
        if (setting) {
            console.log("this.windy", setting);
            return JSON.parse(setting);
        }
        return {};
    }

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

    async handleDownload() {
        const link = document.createElement("a");
        // const arrayBuffer = await new Response(this.media).arrayBuffer();
        link.href = this.media
        link.setAttribute("download", "test-video"); //or any other extension
        // document.body.appendChild(link);
        link.click();
        // document.body.removeChild(link);

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
        this.mapTitle = {
            ...this.mapTitle,
            position: this.mapTitle.position === 'right animate__fadeInRightBig' ? 'right animate__fadeOutRightBig' : 'left animate__fadeOutLeftBig'
        };
        await sleep(500, this.clearTimeout);
        this.isShowMapTitle = false;
        this.isShowVideoForecase = false;
        this.boxData = null;
        this.isShowVideoForecaseProvince = false;
        this.provinceData = null;
        this.videoLayout = 'default'
    }

    async getFakeImage(placeId) {
        if (!this.isRecording || this.isRemote) return;
        switch (placeId) {
            case 'TBB':
            case 'NTB':
            case 'DNB':
            case 'TQ':
                await sleep(500, this.clearTimeout);
                const canvas = document.getElementById('canvas') as any;
                const context = canvas.getContext('2d');
                context.canvas.width = window.innerWidth;
                context.canvas.height = window.innerHeight;
                context.drawImage(this.player, 0, 0, canvas.width, canvas.height);
                this.fakeImage = canvas.toDataURL("image/png");
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
            case '49':
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

    async displayEachProvince(mapData, isProvince = false) {
        await sleep(2000, this.clearTimeout);
        this.isShowVideoForecase = false;
        this.boxData = null;
        this.videoLayout = mapData.layout;
        this.provinceData = mapData.placeId;
        this.isShowVideoForecaseProvince = true;

    }

    handleTextBox(textBox) {
        if (!textBox) return;
        //@ts-ignore
        this.pushTextBox(textBox);
    }

    handleMapTitle(title) {
        if (!title) return;
        //@ts-ignore
        this.displayMapTitle(title);
    }

    handleTempInfo(tempInfo) {
        if (!tempInfo) return;
        //@ts-ignore
        this.displayTempInfo(tempInfo);
    }

    getCameraPosition(data, type = false) {
        let top = 0;
        let bottom = 0;
        let left = 0;
        let right = 0;
        top = !!data.top ? data.top : 0;
        bottom = !!data.bottom ? data.bottom : 0;
        left = !!data.left ? data.left : 0;
        right = !!data.right ? data.right : 0;
        if (type) {
            return [right, bottom];
        }
        return [left, top]
    }

    async handleChangeRegion(mapData) {
        console.log(this.customLocationControl);
        
        // document.querySelector('.particles-layer').classList.add('hide-animation')
        this.isProvinceData = false;
        await this.getFakeImage(mapData.placeId);
        this.menuClick = false;
        const { map } = this.windy;

        //@ts-ignore
        this.regionGroup = new L.LayerGroup();

        const geojson = mapData.geojson ? JSON.parse(mapData.geojson) : null;
        //@ts-ignore
        const layer = geojson ? L.geoJSON(geojson, { style: mapData.style }) : null;

        // if (mapData.placeId !== 'TQ') this.regionGroup.addLayer(layer);
        let duration = 2;
        let method = 'flyToBounds';
        let destination = layer ? layer.getBounds() : null;
        if (mapData.placeId === 'TBB' || mapData.placeId === 'NTB' || mapData.placeId === 'DNB' || mapData.placeId === 'TQ') {
            this.isDisplayFake = true;
            await sleep(1000, this.clearTimeout);
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
        if (mapData.placeId === 'BTB') {
            method = 'panTo';
            destination = {
                lat: 18.33465916334796,
                lng: 108.77838134765626
            }
        };
        if (mapData.placeId === 'TQ') {
            const VietNamGeojson = await getGeoJson('nation', 'viet_nam');
            //@ts-ignore
            const vnBorder = L.geoJSON(VietNamGeojson);
            map.fitBounds(vnBorder.getBounds(), { maxZoom: 12 });
            await sleep(2000, this.clearTimeout);
            this.isDisplayFake = false;
            this.getMapTtile(mapData);
            this.boxData = DataHelper.deepClone(mapData.placeId);
            console.log(this.boxData);
            this.isShowMapTitle = true;
            return;
        }
        // if (this.centerLatlng) {
        //     const distance = map.distance(this.centerLatlng, layer.getBounds().getCenter())
        //     if (distance >= 800000) {
        //         duration = 8
        //     }
        // }
        console.log(duration);

        map[method](destination, {
            maxZoom: mapData.zoom ? mapData.zoom : null,
            animate: true,
            duration,
            easeLinearity: 0.2,
            paddingBottomRight: this.customLocationControl ? this.getCameraPosition(this.customLocationControl, true) : mapData.paddingBottomRight,
            paddingTopLeft: this.customLocationControl ? this.getCameraPosition(this.customLocationControl) : mapData.paddingTopLeft
        });
        await sleep(1000, this.clearTimeout);
        this.isDisplayFake = false;
        this.getMapTtile(mapData)
        this.isShowMapTitle = true;
        await sleep(3000, this.clearTimeout);

        const provinces = JSON.parse(mapData.province);

        if (this.customLocationControl) {
            if (this.customLocationControl.isEnableLayer) {
                this.addProvinceLayer(provinces);
            }
        } else {
            this.addProvinceLayer(provinces);
        }
        if (mapData.zoom) {
            // await sleep(500, this.clearTimeout);
            this.centerLatlng = map.getBounds().getCenter();
            console.log(this.centerLatlng);

            map.flyTo(this.centerLatlng, mapData.zoom, { animate: true, duration: 0.2, easeLinearity: 0.2 })
            this.layerGroup.addLayer(this.regionGroup);
        }
        await sleep(500, this.clearTimeout);
        this.addPopUPLayer(mapData.provinceIds, mapData.placeId === 'NTB', mapData.animation);
        // document.querySelector('.particles-layer').classList.remove('hide-animation')
        // this.boxData = DataHelper.deepClone(mapData.placeId);
        this.isShowVideoForecase = true;
        this.displayEachProvince(mapData);
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
        // this.layerProvice.addLayer(provinceLayer);
        let duration = 2;
        // if (this.centerLatlng) {
        //     const distance = map.distance(this.centerLatlng, provinceLayer.getBounds().getCenter())
        //     if (distance >= 800000) {
        //         map.flyTo(this.centerLatlng, 10, { animate: true, duration: 5, easeLinearity: 2 })
        //         await sleep(5000, this.clearTimeout);
        //         duration = 8
        //     }
        // }
        map.flyToBounds(provinceLayer.getBounds(), {
            maxZoom: mapData.zoom,
            animate: true, duration,
            easeLinearity: 2,
            paddingBottomRight: this.customLocationControl ? this.getCameraPosition(this.customLocationControl, true) : mapData.paddingBottomRight,
            paddingTopLeft: this.customLocationControl ? this.getCameraPosition(this.customLocationControl) : mapData.paddingTopLeft
        });
        await sleep(duration * 1000, this.clearTimeout);
        const districts = JSON.parse(mapData.district);
        this.getMapTtile(mapData);
        if (this.customLocationControl) {
            if (this.customLocationControl.isEnableLayer) {
                this.addProvinceLayer(districts);
            }
        } else {
            this.addProvinceLayer(districts);
        }
        this.addPopUPLayer(mapData.districtIds);
        this.layerGroup.addLayer(this.layerProvice);
        this.forecastData = STATION.find(x => x.place_id === mapData.placeId);
        this.centerLatlng = provinceLayer.getBounds().getCenter();

        this.isShowMapTitle = true;
        this.boxData = DataHelper.deepClone(mapData.placeId);
        this.isShowVideoForecase = true;
        this.displayEachProvince(mapData, true);
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

    async addPopUPLayer(ids, size = false, animation = 'animate__fadeInDown') {
        if (!ids) return;
        const vm = this as any;
        let isDisplay = true;
        if (this.customLocationControl && !this.customLocationControl.isEnableIcon) {
            isDisplay = false
        }
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
                            ${isDisplay ?
                            `<div class="map-pop-up-data">
                                    <div class="map-pop-up-data--image"><img src="${iconUrl.url}"/></div>
                                    <div class="map-pop-up-data--temp">${temp}°C</div>
                                </div>` : ``}
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
        this.player = document.getElementById('player') as any;
        //@ts-ignore
        return await navigator.mediaDevices.getDisplayMedia({
            video: true, audio: true
        }).then(function (stream) {
            vm.player.srcObject = stream;
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
                        type: 'video/mp4'
                    });
                    vm.isDisplayDialog = true;
                    vm.media = URL.createObjectURL(completeBlob);
                    vm.isRecording = false;

                }, 500);
            };
            vm.videoStream.onstop = e => {
                const completeBlob = new Blob(chunks, {
                    type: 'video/mp4'
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

    handleActionDetail(step) {
        step.scenarioActionDetails.forEach(element => {
            switch (element.scenarioActionTypeId) {
                case SCENARIO_ACTION_DETAIL_ENUM.TEMP_INFO:
                    this.handleTempInfo(element)
                    break;
                case SCENARIO_ACTION_DETAIL_ENUM.TEXT_BOX:
                    this.handleTextBox(element);
                    break;
                case SCENARIO_ACTION_DETAIL_ENUM.TITLE:
                    this.handleMapTitle(element);
                    break;
                default:
                    break;
            }
        });
        
    }

    async handlePreview(previewData, isRecord = false) {
        clearTimeout(this.clearTimeout.timeout);
        this.isStop = false;
        this.isRecording = true;
        if (isRecord) {
            await this.capture();
            await sleep(1000, this.clearTimeout);
        } else {
            this.isShowButtonStop = true;
            this.isReview = true;
            await sleep(1000, this.clearTimeout);
        }
        for (const iterator of previewData) {
            if (this.isStop) {
                this.isStop = false;
                break;
            }
            this[iterator.action] = iterator;
            this.handleActionDetail(iterator);
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
        this.customLocationControl = null;
        this.isShowButtonStop = false;
    }

    handleClearTimeout(isRecord = false) {
        clearTimeout(this.clearTimeout.timeout);
        this.isRecording = false;
        this.isStop = true;
        this.isShowButtonStop = false;
        this.isRemote = false;
        this.customLocationControl = null;
        if (!isRecord) {
            this.drawer = true;
        }
    }

    changeWindySetting (setting) {
        if (setting) {
            console.log('change-particles', setting);
            let { store } = this.windy;
            store.set("particles", setting );
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
        // localStorage.setItem('settings_lang', '"vi"')
        // @ts-ignore
        windyInit(options, async windyAPI => {
            // windyAPI is ready, and contain 'map', 'store',
            // 'picker' and other usefull stuff
            this.windy = windyAPI;
            const { map, overlays, store } = this.windy;
            //@ts-ignore
            map.removeLayer(W.labelsLayer);
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
            // map.invalidateSize()
            this.layerGroup.addLayer(vnBorder);
            this.layerGroup.addTo(map);
            // setInterval(function () {
            //     map.invalidateSize();
            // }, 100);
        });
    }

    handleRemote({ scenario, message }) {
        this.$toast.info(`Bắt đầu điều khiển: ${scenario.scenarioName}`);
        this.isRemote = true;
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
        this.handleActionDetail(step);
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
