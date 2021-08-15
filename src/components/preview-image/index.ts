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

    @Watch('isVisible') 
    handleChangeVisible(val) {
        this.currentIndex = this.current;
        if (val) {
            window.addEventListener("wheel", this.handleScroll);
            document.documentElement.style.overflow = "hidden";
        } else {
            const video = document.getElementById('social-video') as any;
            video.pause();
            window.removeEventListener("wheel", this.handleScroll);
            document.documentElement.style.overflow = "auto";
        }
    }
}