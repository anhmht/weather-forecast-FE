import { DataHelper } from '@/utils/data-helper';
import { SCENARIO_ACTION, ELEVATION } from './../../scenario-default';

import { MAP_PROVINCE, MAP_TYPE, REGION } from '@/constant/forcast-station-constant';
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';

@Component({
    template: require("./template.html").default,
    components: {}
})
export default class AddUpdateContentComponent extends Vue {
    @Prop({required: true})
    value

    @Prop({type: Object, default: null})
    content

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

    get mapTypes() {
        return MAP_TYPE;
    }

    get visibleAddItem() {
        return this.value;
    }

    set visibleAddItem(value) {
        this.$emit('input', value)
    }

    get zooms() {
        return [7,8,9,10,11,12];
    }

    get elevations() {
        return ELEVATION;
    }

    handleSave() {
        if (this.data.action === 'customMapStatusControl') {
            this.data.method = 'handleClick';
        }
        if (this.data.action === 'customZoomControl') {
            this.data.duration = 1000;
        }
        if (this.data.action === 'customLevelControl') {
            this.data.method = 'handleChangeLevel';
        }
        this.$emit('save', this.data);
        this.visibleAddItem = false
    }

    handleChangeAction(value) {
        this.data = {
            action: value,
            method: null,
            data: null,
            duration: 0
        }
    }

    @Watch('value')
    dialogVisible(visible) {
        if (visible) {
            this.data = this.content ? DataHelper.deepClone(this.content) : {
                action: null,
                method: null,
                data: null,
                duration: 0
            }
        }
    }
}
