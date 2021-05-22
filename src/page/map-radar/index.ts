// import { displayLocation } from '@/utils/location-helper';
import { STATION } from '@/constant/forcast-station-constant';
import { ForecastServices } from '@/service/forecast-service/forecast.service';
import Vue from 'vue';
import Component from "vue-class-component";
import img from '../../../static/img/icon/new/day_rain_thunder.png';

@Component({
    template: require("./template.html").default,
    components: {
        "icon-picker": () =>
            import("./components/icon-drag-drop/IconDragDropComponent.vue"),
        "location-picker": () =>
            import("./components/location/LocationComponent.vue"),
        "map-type-picker": () =>
            import("./components/map-type/MapTypeComponent.vue")
    }
})
export default class HomePageComponent extends Vue {
    windy: any;
    media: any = null;
    isRecording: boolean = false;
    isHideIconPicker: boolean = true;
    isDisplayDialog: boolean = false;
    forecastService: ForecastServices = new ForecastServices()
    layerGroup: any;
    layerProvice: any;
    layerPopup: any;

    currentPosition = null;

    handleBack() {
        this.$router.go(-1);
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

    getTemprature(station) {
        return new Promise((resolve, reject) => {
            this.forecastService.getTemperatureByStation(station.id).then((res) => {
                resolve(res[`_${new Date().getHours()}`]);
            }).catch(err => {
                console.log(err);
            })
        })
    }

    async handleChangeLocation(mapData) {
        const { map } = this.windy;
        //Remove geojson layer
        if (this.layerProvice) {
            this.layerGroup.removeLayer(this.layerProvice);
            if(this.layerPopup) {
                this.layerGroup.removeLayer(this.layerPopup);
            }
        }
        if (!mapData.geojson) { // Incase dont have geojson data
            map.flyTo([mapData.lat, mapData.lon], mapData.zoom);
            return;
        }
        // Move map with Geojson data
        const geojson = JSON.parse(mapData.geojson);
        //@ts-ignore
        this.layerProvice = L.geoJSON(geojson, { style: mapData.style });
        map.flyToBounds(this.layerProvice.getBounds(), { maxZoom: mapData.zoom });
        this.layerGroup.addLayer(this.layerProvice);

        const station = STATION.find(x => x.place_id === mapData.placeId);
        let temp = null;
        if (station) {
            temp = await this.getTemprature(station);
            //@ts-ignore
            this.layerPopup = L.popup()
                .setLatLng([station.y, station.x])
                .setContent(`<div class="map-pop-up">
                            <img src="${img}"/>
                            <div class="map-pop-up-temp">${temp}℃</div>
                        </div>`)
        } else {
            temp = 32;
        }
        if (station) {
            this.layerGroup.addLayer(this.layerPopup);
        }
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
            zoom: 7
        };
        // @ts-ignore
        windyInit(options, windyAPI => {
            // windyAPI is ready, and contain 'map', 'store',
            // 'picker' and other usefull stuff
            this.windy = windyAPI;
            const { map } = this.windy;
            map.setZoom(6);
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
            this.layerGroup.addTo(map);


        });
    }
}
