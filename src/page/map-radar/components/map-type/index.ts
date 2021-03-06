import { MAP_TYPE } from "@/constant/forcast-station-constant";
import { DataHelper } from "@/utils/data-helper";
import Vue from "vue";
import Component from "vue-class-component";
import { Watch, Prop } from "vue-property-decorator";


@Component({
    template: require("./template.html").default,
    components: {}
})
export default class MapTypeComponent extends Vue {
    @Prop({ type: Object, default: null })
    custom

    isActive: Number = 0;

    searchType: string = null;

    get mapTypes() {
        let list = MAP_TYPE;
        if (this.searchType != null && this.searchType !== "") {
            list = list.filter(t => {
                const name = DataHelper.convertToNonAccent(t.name.toLowerCase());
                const search = DataHelper.convertToNonAccent(this.searchType.toLowerCase());
                return name.includes(search);
            });
        }
        return list;
    }

    handleClick(index) {
        this.isActive = index;
        const type = this.mapTypes[index];
        this.$emit("change-map", type);
    }

    @Watch('custom')
    handleMoveCustom(val, old) {
        let index = this.mapTypes.findIndex(x => x.type === val.data);
        this[val.method](index);
    }
}
