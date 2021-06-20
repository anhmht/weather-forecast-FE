import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';

@Component({
    template: require("./template.html").default,

})
export default class ForecastItemComponent extends Vue {
    @Prop({type: String, default: null})
    title

    @Prop({type: String, default: null})
    desc

    @Prop({type: String, default: null})
    icon
}
