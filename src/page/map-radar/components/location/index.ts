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

    searchProvince: string = null;

    get regions() {
        return REGION;
    }
    
    get locations() {
        let list = MAP_PROVINCE;
        if (this.searchProvince != null && this.searchProvince !== "") {
            list = list.filter(p => {
                const name = DataHelper.convertToNonAccent(p.name.toLowerCase());
                const search = DataHelper.convertToNonAccent(this.searchProvince.toLowerCase());
                return name.includes(search);
            });
        }
        return list;
    }

    handleChangeTab(index) {
        this.activeTab = index;
        this.isActive = null;
        this.activeTabRegion = null;
        this.$emit('clear')
    }

    async handleClick(index) {
        this.$emit('clear')
        this.isActive = index;
        const mapLocation = DataHelper.deepClone(this.locations[index]) as any;
        const geojson = await getGeoJson('province', mapLocation.geojson) as any;
        mapLocation.geojson = JSON.stringify(geojson);
        mapLocation.district = JSON.stringify(geojson.features);
        this.$emit("change-map", mapLocation);
    }

    async handleClickRegion(index) {
        this.$emit('clear')
        if(index === -1) {
            this.$emit("change-region-map", { placeId: 'TQ'});
            return;
        }
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
        let index = null
        if (val.method === 'handleClickRegion') {
            index = this.regions.findIndex(x => x.placeId === val.data);
        } else {
            index = this.locations.findIndex(x => x.placeId === val.data);
        }
        this[val.method](index);
    }
}
