import Vue from 'vue';
import Component from "vue-class-component";
@Component({
    template: require("./template.html").default,
    components: {
        "icon-picker": () => import("./components/icon-drag-drop/IconDragDropComponent.vue")
    }
})
export default class HomePageComponent extends Vue {
    windy: any;
    media: any = null;
    isRecording: boolean = false;
    isDisplayDialog: boolean = false;

    handleDownload() {
        const link = document.createElement("a");
        link.href = this.media;
        link.setAttribute("download", "test-video"); //or any other extension
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
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
                };;
                recorder.onended = e => {

                };
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
        const options = {
            // Required: API key
            key: "PsLAtXpsPTZexBwUkO7Mx5I", // REPLACE WITH YOUR KEY !!!
            // key: 'yw7vbuA1PQmaUPe0SNECjxmOIv5AJ4FC', // Production !!!

            // Put additional console output
            verbose: true,

            // Optional: Initial state of the map
            lat: 10.781,
            lon: 106.64,
            zoom: 5
        };

        // @ts-ignore
        this.windy = windyInit(options, windyAPI => {
            // windyAPI is ready, and contain 'map', 'store',
            // 'picker' and other usefull stuff

            const { map } = windyAPI;
            // const levels = store.getAllowed('availLevels');
            // let i = 0;
            // setInterval(() => {
            //     i = i === levels.length - 1 ? 0 : i + 1;

            //     // Changing Windy params at runtime
            //     store.set('level', levels[i]);
            // }, 300);
            // .map is instance of Leaflet map

            // @ts-ignore
            L.popup()
                .setLatLng([10.781, 106.64])
                .setContent("Hello World")
                .openOn(map);
        });
    }
}
