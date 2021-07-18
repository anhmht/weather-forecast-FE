import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop, Watch } from 'vue-property-decorator';
import { DataHelper } from '@/utils/data-helper';

@Component({
    template: require("./template.html").default,
    components: {}
})
export default class AddUpdateTempInfoComponent extends Vue {
    @Prop({ required: true })
    visible

    @Prop({ required: true })
    location

    @Prop({ required: true })
    isProvince

    @Prop({ type: Object, default: null })
    editData

    forecastData: any = null

    data = {
        isDisplay: false,
        startTime: 0,
        duration: 0,
        position: 'top-right',
        customPosition: false,
        left: 0,
        top: 0,
        placeId: null,
        isProvince: false
    }

    get visbileTextBox() {
        return this.visible;
    }

    set visbileTextBox(value) {
        this.$emit("update:visible", value);
    }

    durations = [
        { text: '0 giây', value: 0 },
        { text: '1 giây', value: 1000 },
        { text: '2 giây', value: 2000 },
        { text: '3 giây', value: 3000 },
        { text: '4 giây', value: 4000 },
        { text: '5 giây', value: 5000 },
        { text: '6 giây', value: 6000 },
        { text: '7 giây', value: 7000 },
        { text: '8 giây', value: 8000 },
        { text: '9 giây', value: 9000 },
        { text: '10 giây', value: 10000 },
        { text: '11 giây', value: 11000 },
        { text: '12 giây', value: 12000 },
        { text: '13 giây', value: 13000 },
        { text: '14 giây', value: 14000 },
        { text: '15 giây', value: 15000 },
        { text: '16 giây', value: 16000 },
        { text: '17 giây', value: 17000 },
        { text: '18 giây', value: 18000 },
        { text: '19 giây', value: 19000 },
        { text: '20 giây', value: 20000 },
        { text: '25 giây', value: 25000 },
        { text: '30 giây', value: 30000 },
    ]

    positions = [
        { text: 'top', value: 'top' },
        { text: 'top-left', value: 'top-left' },
        { text: 'top-right', value: 'top-right' },
        { text: 'middle', value: 'middle' },
        { text: 'middle-left', value: 'middle-left' },
        { text: 'middle-right', value: 'middle-right' },
        { text: 'bottom', value: 'bottom' },
        { text: 'bottom-left', value: 'bottom-left' },
        { text: 'bottom-right', value: 'bottom-right' },
    ]

    handleSaveTextBox() {
        this.$emit('save', this.data);
        console.log(this.data);
        
        this.visbileTextBox = false
    }

    @Watch('visible')
    dialogVisible(visible) {
        if (visible) {
            this.data = this.editData ? DataHelper.deepClone(this.editData) : {
                isDisplay: false,
                startTime: 0,
                duration: 0,
                position: 'top-right',
                customPosition: false,
                left: 0,
                top: 0,
                placeId: this.location,
                isProvince: this.isProvince
            }
        }
    }
}
