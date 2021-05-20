import Vue from "vue";
import Component from "vue-class-component";

@Component({
    template: require("./template.html")
})
export default class WindyMapComponent extends Vue {
    windy: any = null;

    mounted() {
        const options = {
            // Required: API key
            key: "PsLAtXpsPTZexBwUkO7Mx5I", // REPLACE WITH YOUR KEY !!!
            // key: 'yw7vbuA1PQmaUPe0SNECjxmOIv5AJ4FC', // Production !!!
            verbose: true, // Put additional console output
            // Optional: Initial state of the map
            lat: 10.781,
            lon: 106.64,
            zoom: 5
        };

        // @ts-ignore
        this.windy = windyInit(options, windyAPI => {
            // windyAPI is ready, and contain 'map', 'store',
            // 'picker' and other usefull stuff
            // const levels = store.getAllowed('availLevels');
            // let i = 0;
            // setInterval(() => {
            //     i = i === levels.length - 1 ? 0 : i + 1;
            //     // Changing Windy params at runtime
            //     store.set('level', levels[i]);
            // }, 300);
            // .map is instance of Leaflet map
            // @ts-ignore
            // L.popup()
            //     .setLatLng([10.781, 106.64])
            //     .setContent("Hello World")
            //     .openOn(map);
        });
    }
}
