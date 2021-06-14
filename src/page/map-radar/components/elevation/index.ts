import { ELEVATION } from './../scenario/scenario-default';
import Vue from 'vue';
import Component from 'vue-class-component';
@Component({
    template: require("./template.html").default,
    components: {}
})
export default class ElevationComponent extends Vue {
    value: number = 0;

    elevation: any = ELEVATION

    getDisplayElevation(value) {
        return this.elevation.find(x => x.value === value).label
    }

    handleChangeLevel(value) {
        this.$emit('input', value);
        const data = this.elevation.find(x => x.value === value)
        this.$emit('change', data.data);
    }
}
