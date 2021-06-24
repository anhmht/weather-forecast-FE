import { MediaServices } from './../../../../service/media-service/media.service';
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop, Watch } from 'vue-property-decorator';

@Component({
    template: require("./template.html").default,
    components: {}
})
export default class QRCodeComponent extends Vue {
    @Prop({ required: true })
    value

    qrCode: string = null;
    mediaService: MediaServices = new MediaServices()

    get isDisplayDialog() {
        return this.value;
    }

    set isDisplayDialog(value) {
        this.$emit('input', value)
    }

    generateQRCode() {
        if(!this.qrCode) {
            this.mediaService.generateQRCode('test').then((res: any) => {
                this.qrCode = res.url
            }).catch(err => {
                console.log(err);
            })
        }
    }

    @Watch('value')
    dialogVisible(visible) {
        if (visible) {
            this.generateQRCode();
        }
    }
}
