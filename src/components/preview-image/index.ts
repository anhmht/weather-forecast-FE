import Vue from 'vue';
import { Component, Prop, Watch } from 'vue-property-decorator';
import NO_IMAGE from '../../../static/img/no-image/no-image.png';

@Component({
    template: require("./template.html").default
})
export default class PreviewImageComponent extends Vue { 
    @Prop({required: true, type: Boolean}) 
    isVisible

    @Prop({ required: true, type: Array })
    data

    @Prop({ default: 0, type: Number })
    current

    degree: number = 0;
    scale: number = 0.5;
    isFullScreen: boolean = true;
    currentIndex: number = 0;
    player: any = null;

    isShowPlayer: boolean = false;

    get styleObject() {
        return {
            transform: `scale(${this.scale}) rotate(${this.degree}deg)`,
            marginLeft: '0px',
            marginTop: '0px',
            maxHeight: this.isFullScreen ? '100%' : 'unset',
            maxWidth: this.isFullScreen ? '100%' : 'unset',
            transition: 'transform 0.3s ease 0s'
        }
    }

    get MediaData() {
        return this.data[this.currentIndex];
    }

    get isBinaryVideo () {
        if (this.MediaData && this.MediaData.type === 'video') {
            return this.MediaData.url.includes("data:video/mp4;base64");
        }
        return false;
    }

    handleZoom(isZoomOut: boolean) {
        if (isZoomOut) {
            this.scale -= .2
        } else {
            this.scale += .2
        }
    }

    handleFullScreen() {
        this.scale = 1;
        this.isFullScreen = !this.isFullScreen;
    }

    handleRotate(isRotateLeft: boolean) {
        if (isRotateLeft) {
            this.degree -= 90;
        } else {
            this.degree += 90;
        }
    }

    handleChangeImage(isPrev: boolean) {
        this.scale = 0.5;
        this.isFullScreen = true;
        this.degree = 0;
        
        if (isPrev) {
            if (this.currentIndex === 0) {
                this.currentIndex = this.data.length - 1;
            } else {
                this.currentIndex -= 1;
            }
        } else {
            if (this.currentIndex === this.data.length - 1) {
                this.currentIndex = 0;
            } else {
                this.currentIndex += 1;
            }
        }

        if (this.MediaData.type === 'video') {
            this.player = null;
        } else {
            if (this.player) this.player.dispose();
        }
        this.$nextTick(() => {
            if (this.MediaData.type === 'video') {
                if (typeof this.$refs.player != 'undefined') {
                    if (!this.isBinaryVideo) this.initPlayer();
                }
            }
        })
    }

    initPlayer() {
        const vm = this as any;
            //@ts-ignore
            this.player = amp('preview-player', { /* Options */
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
            }, () => {
                console.log('Good to go!');
                vm.isShowPlayer = true;
                const player = document.getElementById('preview-player') as any;
                setTimeout(() => {
                    player.style = '';
                }, 500);
            });
            this.player.src([{
                src: this.MediaData.url,
                type: "application/vnd.ms-sstr+xml"
            }]);
        
    }

    handleScroll(event) {
        if (event.deltaY < 0) {
            this.scale += .1
        } else {
            this.scale -= .1
        }
        
    }

    imageError(event) {
        event.target.src = NO_IMAGE;
    }

    updated() {
        
    }

    @Watch('isVisible') 
    handleChangeVisible(val) {
        this.currentIndex = this.current;
        if (val) {
            window.addEventListener("wheel", this.handleScroll);
            document.documentElement.style.overflow = "hidden";
            this.$nextTick(() => {
                if (this.MediaData.type === 'video') {
                    if (typeof this.$refs.player != 'undefined') {
                        if (!this.isBinaryVideo) this.initPlayer();
                    }
                }
            })
        } else {
            if (this.player) {
                this.player.dispose();
                this.isShowPlayer = false;
            }
            window.removeEventListener("wheel", this.handleScroll);
            document.documentElement.style.overflow = "auto";
        }
    }
}