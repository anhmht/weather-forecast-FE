import { namespace, Action, Getter } from 'vuex-class';
import Vue from "vue";
import Component from "vue-class-component";
import { storeModules } from '@/store';
import lookupTypesStore from '@/store/lookup/lookup-types.store';
import { PROVINCE } from '@/constant/province-constant';
import { MonitoringServices } from '@/service/monitoring-service/monitoring.service';

const LookupAction = namespace(storeModules.Lookup, Action);
const LookupGetter = namespace(storeModules.Lookup, Getter);
@Component({
    template: require("./template.html").default,
    components: {
        "base-container": () => import("../../components/base-container/BaseContainerComponent.vue")
    }
})
export default class DataPageComponent extends Vue {
    region: string = null;
    allProvinces = PROVINCE;
    province: number = null;
    @LookupAction getLookupData: (type: string) => Promise<void>
    @LookupGetter(lookupTypesStore.Get.KTTV) stations
    monitoringService: MonitoringServices = new MonitoringServices();

    allRegions: any = [
        {
            name: "Đông Bắc Bộ",
            value: "DBB"
        },
        {
            name: "Tây Bắc Bộ",
            value: "TBB"
        },
        {
            name: "Đồng bằng sông Hồng",
            value: "DBSH"
        },
        {
            name: "Bắc Trung Bộ",
            value: "BTB"
        },
        {
            name: "Nam Trung Bộ",
            value: "NTB"
        },
        {
            name: "Tây Nguyên",
            value: "TN"
        },
        {
            name: "Đông Nam Bộ",
            value: "DNB"
        },
        {
            name: "Tây Nam Bộ",
            value: "TNB"
        },
    ]

    get ProvincesByRegion() {
        return this.allProvinces.filter(p => p.region === this.region);
    }

    get StationsByProvince() {
        if (!isNaN(Number(this.province)) && this.stations) {
            return this.stations.filter(s => s.zipCode === Number(this.province));
        }
        return [];
    }

    async mounted() {
        this.getLookupData(lookupTypesStore.Set.KTTV);
    }
}
