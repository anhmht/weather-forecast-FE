import moment from 'moment';
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from 'vue-property-decorator';


@Component({
    template: require("./template.html").default,
    components: {}
})
export default class ForecastResultComponent extends Vue {
    @Prop({required: true})
    data

    get address() {
        return this.data.currentPosition;
    }

    get time() {
        return this.data.currentDay;
    }

    async mounted() {
        moment.locale('vi');
    }
}
