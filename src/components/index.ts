import Vue from 'vue';
import Component from "vue-class-component";
@Component({
  template: require('./template.html').default,
  components: {}
})
export default class HelloWorld extends Vue {

  map: any;
  clearInterval: any = null;
  gif: any;
  windy: any;
  print: any;
  media: any = null;
  test: string = "test"
  stop() {
      clearInterval(this.clearInterval);
  }

  async capture() {
    console.log(this.windy);
    //@ts-ignore
      let stream = await navigator.mediaDevices.getDisplayMedia({
        video: { mediaSource: "screen" }
      });
      //@ts-ignore
      let recorder = new MediaRecorder(stream);
      const vm = this;
      const chunks = [];
      recorder.ondataavailable = e => chunks.push(e.data);
      recorder.onstop = e => {
        const completeBlob = new Blob(chunks, { type: chunks[0].type });
        //@ts-ignore
        document.querySelector("video").src = URL.createObjectURL(completeBlob)
        vm.media = URL.createObjectURL(completeBlob)
        // window.open(URL.createObjectURL(completeBlob));
      };

      recorder.start();
  }

  mounted() {
    const options = {
      // Required: API key
      key: 'PsLAtXpsPTZexBwUkO7Mx5I', // REPLACE WITH YOUR KEY !!!

      // Put additional console output
      verbose: true,

      // Optional: Initial state of the map
      lat: 10.781,
      lon: 106.640,
      zoom: 5,
    };

    // @ts-ignore
    this.windy = windyInit(options, windyAPI => {
        // windyAPI is ready, and contain 'map', 'store',
        // 'picker' and other usefull stuff

        const {  map  } = windyAPI;
        // const levels = store.getAllowed('availLevels');
        // let i = 0;
        // setInterval(() => {
        //     i = i === levels.length - 1 ? 0 : i + 1;

        //     // Changing Windy params at runtime
        //     store.set('level', levels[i]);
        // }, 300);
        // .map is instance of Leaflet map
        this.map = map;

        // @ts-ignore
        L.popup()
            .setLatLng([10.781,106.640])
            .setContent('Hello World')
            .openOn(map);
          this.map.on('easyPrint-finished', (eventArgument) => {
            console.log(eventArgument);

        });
    });

  }
}