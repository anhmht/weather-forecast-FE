import { sleep } from './../../../../utils/common-utils';
import { EVENT_BUS } from './../../../../constant/event-bus-constant';
import { DataHelper } from '@/utils/data-helper';
import { MediaServices } from './../../../../service/media-service/media.service';
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop, Watch } from 'vue-property-decorator';
import EventBus from '@/utils/event-bus';
import tutorial from '../../../../../static/img/qrcode/tutorial.gif';

@Component({
    template: require("./template.html").default,
    components: {}
})
export default class QRCodeComponent extends Vue {
    @Prop({ required: true })
    value

    qrCode: string = null;
    tutorial:any = tutorial;
    connectionId: string = DataHelper.create_UUID();
    mediaService: MediaServices = new MediaServices()

    get isDisplayDialog() {
        return this.value;
    }

    set isDisplayDialog(value) {
        this.$emit('input', value)
    }

    generateQRCode() {
        if(!this.qrCode) {
            this.mediaService.generateQRCode(this.connectionId).then((res: any) => {
                this.qrCode = res.url
            }).catch(err => {
                console.log(err);
            })
        }
    }

    async handleMessage(message) {
        console.log(message);
        if (message.event === 'START') {
            let clear = { timeout: null };
            this.$toast.success('Kết nối thành công');
            await sleep(500, clear);
            this.isDisplayDialog = false;
            await sleep(500, clear);
            EventBus.$emit(EVENT_BUS.NOTIFICATION.START, message);
        } else if (message.event === 'MOVE') {
            EventBus.$emit(EVENT_BUS.NOTIFICATION.MOVE, message);
        }
    }

    createRemoteGroup() {
        this.$socket.invoke(this.connectionId);
    }

    mounted() {
        if (this.$socket.isReady) {
            this.$socket.invoke(this.connectionId);
        }
        EventBus.$on(EVENT_BUS.NOTIFICATION.CONNECTED, this.createRemoteGroup)
        this.$socket.onEvent('ReceiveMessage', this.handleMessage);
    }

    beforeDestroy() {
        EventBus.$off(EVENT_BUS.NOTIFICATION.CONNECTED, this.createRemoteGroup)
    }

    @Watch('value')
    dialogVisible(visible) {
        if (visible) {
            this.generateQRCode();
        }
    }
}
