import moment from 'moment';
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from 'vue-property-decorator';
import 'moment/locale/vi';
import { ICON } from '@/constant/icon-constant';
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

    get Icon () {
        const icon = ICON.find(x => x.id === this.data.icon)
        return icon ? icon.url : null;
    }

    get IconDescription() {
        const icon = ICON.find(x => x.id === this.data.icon)
        return icon ? icon.description : null;
    }

    async mounted() {
        moment.locale('vi');
    }
}
