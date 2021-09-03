
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';

@Component({
     // template: require("./template.html").default,
    components: {},
    render: function (createElement) {
        if (!this.template) {
            return createElement("span", "Loading...");
        } else {
            return this.template();
        }
    },
    created() {
        if (this.editable === true) {
            this.template = Vue.compile(require("./template_editable.html").default).render;
            return;
        }
        const number = (this.images ? this.images.length : 0) + (this.videos ? this.videos.length : 0);
        switch (number) {
            case 1:
                this.template = Vue.compile(require("./template_1.html").default).render;
                break;
            case 2:
                this.template = Vue.compile(require("./template_2.html").default).render;
                break;
            case 3:
                this.template = Vue.compile(require("./template_3.html").default).render;
                break;
            case 4:
                this.template = Vue.compile(require("./template_4.html").default).render;
                break;
            default:
                this.template = Vue.compile(require("./template.html").default).render;
                break;
        }
    }
})
export default class MediaLayoutComponent extends Vue {
    @Prop({ type: Array, default: [] })
    images

    @Prop({ type: Array, default:  [] })
    videos

    @Prop( {type: Boolean, default: false})
    editable

    player: any = null;

    get Medias() {
        let result = []
        const imagesArr = this.images ? this.images.map(x => {
            return {
                type: 'image',
                url: x
            }
        }) : [];
        const videoArr = this.videos ? this.videos.map(x => {
            return {
                type: 'video',
                url: x
            }
        }) : [];
        result = imagesArr.concat(videoArr);
        return result;
    }

    get layoutType () {
        if (this.Medias.length > 4) return 5;
        return this.Medias.length;
    }

    getRatio (index) {
        switch (this.Medias.length) {
            case 1:
                return 9/16
            case 2:
                return 3/2
            case 3:
                if (index == 0) {
                    return 16/9
                } else {
                    return 1
                }
            default:
                if (index == 0) {
                    return 1/2
                } else {
                    return 3/2
                }
        }
    }

    handlePreview(index) {
        this.$emit('preview', {index, medias: this.Medias})
    }

    initPlayer() {
        setTimeout(() => {
            //@ts-ignore
            this.player = amp('player', { /* Options */
                techOrder: ["azureHtml5JS", "flashSS", "html5FairPlayHLS", "silverlightSS", "html5"],
                "nativeControlsForTouch": false,
                autoplay: true,
                controls: true,
                width: "640",
                height: "400",
                playbackSpeed: {
                    enabled: true,
                    initialSpeed: 1.0,
                    speedLevels: [
                        { name: "x4.0", value: 4.0 },
                        { name: "x3.0", value: 3.0 },
                        { name: "x2.0", value: 2.0 },
                        { name: "x1.75", value: 1.75 },
                        { name: "x1.5", value: 1.5 },
                        { name: "x1.25", value: 1.25 },
                        { name: "normal", value: 1.0 },
                        { name: "x0.75", value: 0.75 },
                        { name: "x0.5", value: 0.5 },
                    ]
                },
                poster: ""
            }, function () {
                console.log('Good to go!');
                // add an event listener
                this.addEventListener('ended', function () {
                    console.log('Finished!');
                });
            });
            this.player.src([{
                src: this.Medias[0].url,
                type: "application/vnd.ms-sstr+xml"
            }]);
        }, 500);
    }

    mounted() {
        this.$nextTick(() => {
            if (this.Medias.length === 1 && this.Medias[0].type === 'video') {
                if (typeof this.$refs.player != 'undefined') {
                    this.initPlayer();
                }
            }
        })
    }

}