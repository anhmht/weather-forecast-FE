import { MAP_PROVINCE } from './../../../../constant/forcast-station-constant';
import { getGeoJson } from './../../../../utils/location-helper';
import { DataHelper } from "@/utils/data-helper";
import Vue from "vue";
import Component from "vue-class-component";
import { Prop, Watch } from 'vue-property-decorator';
import { REGION } from '@/constant/forcast-station-constant';

@Component({
    template: require("./template.html").default,
    components: {}
})
export default class LocationComponent extends Vue {
    @Prop({type: Object, default: null})
    custom

    isActive: Number = null;
    activeTabRegion: number = null;

    activeTab: number = 0;

    get regions() {
        return REGION;
    }
    get locations() {
        return MAP_PROVINCE;
    }

    handleChangeTab(index) {
        this.activeTab = index;
        this.isActive = null;
        this.activeTabRegion = null;
        this.$emit('clear')
    }

    async handleClick(index) {
        this.isActive = index;
        const mapLocation = DataHelper.deepClone(this.locations[index]) as any;
        const geojson = await getGeoJson('province', mapLocation.geojson) as any;
        mapLocation.geojson = JSON.stringify(geojson);
        mapLocation.district = JSON.stringify(geojson.features);
        this.$emit("change-map", mapLocation);
    }

    async handleClickRegion(index) {
        this.activeTabRegion = index;
        const mapLocation = DataHelper.deepClone(this.regions[index]) as any;
        const geojson = await getGeoJson('region', mapLocation.geojson) as any;
        mapLocation.geojson = JSON.stringify(geojson);
        mapLocation.province = JSON.stringify(geojson.features);
        this.$emit("change-region-map", mapLocation);
    }

    async mounted() {

    }

    @Watch('custom')
    handleMoveCustom(val, old) {
        this[val.methodName](val.data);
    }
}
