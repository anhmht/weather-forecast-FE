import Vue from 'vue';
import Component from "vue-class-component";
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
        console.log(mapData);
        const { store } = this.windy;
        store.set("overlay", mapData.type);
    }

    handleChangeLocation(mapData) {
        console.log(mapData);
        const { map } = this.windy;
        map.flyTo([mapData.lat, mapData.lon], mapData.zoom);
    }

    async capture() {
        this.isRecording = true;
        const vm = this as any;
        //@ts-ignore
        navigator.mediaDevices.getDisplayMedia({ video: { mediaSource: "screen" } })
            .then(function(stream) {
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
                recorder.onended = e => {};
                recorder.onerror = () => {
                    vm.isRecording = false;
                };
                recorder.start();
            })
            .catch(err => {
                vm.isRecording = false;
            });
    }

    mounted() {
        let apiKey = "d4a2aee090ae49548d4133121211205";
        //@ts-ignore
        $.getJSON("https://api.weatherapi.com/v1/ip.json?lang=vi&key=" + apiKey + "&q=42.117.31.144", function(data) {
            console.log(JSON.stringify(data, null, 2));
        });
        const options = {
            // Required: API key
            // key: "PsLAtXpsPTZexBwUkO7Mx5I", // REPLACE WITH YOUR KEY !!!
            key: 'yw7vbuA1PQmaUPe0SNECjxmOIv5AJ4FC', // Production !!!

            // Put additional console output
            verbose: true,

            // Optional: Initial state of the map
            lat: 16.06778,
            lon: 108.22083,
            zoom: 5
        };

        // @ts-ignore
        windyInit(options, windyAPI => {
            // windyAPI is ready, and contain 'map', 'store',
            // 'picker' and other usefull stuff
            this.windy = windyAPI;
        });
    }
}
