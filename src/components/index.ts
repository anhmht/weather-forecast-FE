import Vue from 'vue';
import Component from "vue-class-component";
// import html2canvas from 'html2canvas';
const GIF = require('gif.js.optimized');
//@ts-nocheck
require('../../static/js/gif.js');
//@ts-nocheck
require('../../static/js/gif.worker.js');

@Component({
  template: require('./template.html').default,
  components: {}
})
export default class HelloWorld extends Vue {

  clearInterval: any = null;
  gif: any;

  stop() {
      clearInterval(this.clearInterval);
  }

  capture() {
    // let i = 0;
    //   let temp = [];
    //@ts-ignore
    console.log($('#capture').html());


      // this.clearInterval =  setInterval(() => {
      //     if(i >= 10) {
      //       debugger
      //     temp.forEach(element => {
      //         // add an image element
      //       this.gif.addFrame(element, {delay: 200});
      //     });

      //     this.gif.on('finished', function(blob) {
      //       debugger
      //       window.open(URL.createObjectURL(blob));
      //     });

      //       this.gif.render();

      //       this.stop();
      //       return
      //     }
      //     html2canvas(document.querySelector("#capture"), {
      //       width: 1800,
      //       height: 800
      //     }).then(canvas => {
      //         var img  = canvas.toDataURL("image/png");
      //         var myImage = new Image(1800, 800);
      //         myImage.src = img;
      //         temp.push(myImage);
      //         i+= 1;
      //     });

      // }, 1000);
  }

  mounted() {
    this.gif = new GIF({
            workers: 6,
            quality: 1,
            workerScript: './static/js/gif.worker.js',
            width: 1800,
            height: 800
      })
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
    windyInit(options, windyAPI => {
        // windyAPI is ready, and contain 'map', 'store',
        // 'picker' and other usefull stuff

        // const { store  } = windyAPI;
        // const levels = store.getAllowed('availLevels');
        // let i = 0;
        // setInterval(() => {
        //     i = i === levels.length - 1 ? 0 : i + 1;

        //     // Changing Windy params at runtime
        //     store.set('level', levels[i]);
        // }, 300);
        // .map is instance of Leaflet map
        //@ts-ignore
        // L.popup()
        //     .setLatLng([10.781,106.640])
        //     .setContent('Hello World')
        //     .openOn(map);
    });
  }
}