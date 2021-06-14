import { SCENARIO_ACTION } from './../../scenario-default';

import { MAP_PROVINCE, REGION } from '@/constant/forcast-station-constant';
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({
    template: require("./template.html").default,
    components: {}
})
export default class AddUpdateContentComponent extends Vue {
    @Prop({required: true})
    value

    durations = [
        { text: '0 giây', value: 0 },
        { text: '3 giây', value: 3000 },
        { text: '5 giây', value: 5000 },
        { text: '10 giây', value: 10000 },
    ]

    actionList = SCENARIO_ACTION

    data = {
        action: null,
        method: null,
        data: null,
        duration: 0
    }

    get regions() {
        return REGION;
    }
    get locations() {
        return MAP_PROVINCE;
    }

    get visibleAddItem() {
        return this.value;
    }

    set visibleAddItem(value) {
        this.$emit('input', value)
    }

    handleSave() {
        this.$emit('save', this.data);
        this.visibleAddItem = false
    }
}
