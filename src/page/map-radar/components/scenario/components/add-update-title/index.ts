import { REGION, STATION } from '@/constant/forcast-station-constant';
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop, Watch } from 'vue-property-decorator';
import { IScenarioActionDetail, ScenarioActionDetail } from '@/model/scenario';
import { POSITION } from '../../scenario-default';

@Component({
    template: require("./template.html").default,
    components: {}
})
export default class AddUpdateTitleComponent extends Vue {
    @Prop({ required: true })
    visible

    @Prop({ required: true })
    location

    @Prop({ required: true })
    isProvince

    @Prop({ type: Object, default: null })
    editData

    forecastData: any = null

    data: IScenarioActionDetail = new ScenarioActionDetail({});

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

    positions = POSITION

    handleSaveTextBox() {
        this.$emit('save', this.data);
        this.visbileTextBox = false
    }

    getStationIdByRegion(regionCode) {
        const foundRegion = REGION.find(x => x.placeId === regionCode);
        return foundRegion.name;
    }

    getStationIdByProvince(regionCode) {
        const station = STATION.find(x => x.place_id === regionCode);
        return station.ten;
    }

    fetchData() {
        this.forecastData = this.isProvince ? this.getStationIdByProvince(this.location) : this.getStationIdByRegion(this.location)
    }

    @Watch('visible')
    dialogVisible(visible) {
        if (visible) {
            this.fetchData();
            this.data = this.editData ? new ScenarioActionDetail({ ...this.editData, placeId: this.location }) : new ScenarioActionDetail({placeId: this.location})
        }
    }
}
