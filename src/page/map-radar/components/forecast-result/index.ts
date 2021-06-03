
import { STATION } from '@/constant/forcast-station-constant';
import { displayLocation } from '@/utils/location-helper';
import moment from 'moment';
import Vue from "vue";
import Component from "vue-class-component";


@Component({
    template: require("./template.html").default,
    components: {}
})
export default class ForecastResultComponent extends Vue {
    currentPosition: any = null;
    currentDay: string = null;

    get address() {
        return this.currentPosition ? STATION.find(x => x.place_id === this.currentPosition.regionCode).ten : null
    }

    async mounted() {
        this.currentPosition = await displayLocation() as any;
        moment.locale('vi');
        this.currentDay = moment().format('dddd, DD/MM/YYYY');
    }
}
