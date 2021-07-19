
import { MAP_PROVINCE, REGION } from '@/constant/forcast-station-constant';
import { sleep } from '@/utils/common-utils';
import Vue from 'vue';
import Component from 'vue-class-component';


@Component({
    template: require("./template.html").default,
    components: {
        "video-forecast-province": () => import("../video-forecast-province/VideoForecastProvinceComponent.vue")
    }
})
export default class CustomVideoForecastProvince extends Vue {
    provinceData: any = null;

    get videoLayout() {
        if (!this.provinceData) return;
        if (this.provinceData.isProvince) {
            const province = MAP_PROVINCE.find(x => x.placeId === this.provinceData.placeId)
            return province.layout
        } else {
            const region = REGION.find(x => x.placeId === this.provinceData.placeId)
            return region.layout
        }
    }

    async renderProvinceData(data) {
        console.log(data);
        
        let clear = { timeout: null };
        await sleep(data.startTime, clear);
        data.class = `animate__zoomIn ${data.position}`
        data.style = data.customPosition ? `left: ${data.left}px; top: ${data.top}px; transform: none; right: unset; bottom: unset` : ``
        this.provinceData = data;
        await sleep(data.duration, clear);
        this.provinceData = {
            ...this.provinceData,
            class: `animate__zoomOut ${data.position}`
        }
        setTimeout(() => {
            this.provinceData = {}
        }, 1000);
    }
}