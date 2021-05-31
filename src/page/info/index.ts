import { Action } from 'vuex-class';
import { Getter } from 'vuex-class';
import { namespace } from 'vuex-class';
import Vue from "vue";
import Component from "vue-class-component";
import { Carousel, Slide } from 'vue-carousel';
import { ForecastServices } from "@/service/forecast-service/forecast.service";
// import { displayLocation } from "@/utils/location-helper";
import { STATION } from "@/constant/forcast-station-constant";
import { ROUTE_NAME } from "../../constant/route-constant";
import { PostServices } from '../../service/post-service/post.service';
import { CategoryServices } from '../../service/category-service/category.service';
import { displayLocation } from "@/utils/location-helper";
import { DataHelper } from "@/utils/data-helper";
import { DATE } from "@/constant/common-constant";
import { storeModules } from '@/store';
import lookupTypesStore from '@/store/lookup/lookup-types.store';
import IStatus from '@/model/status/status.model';

const LookupGetter = namespace(storeModules.Lookup, Getter);
const LookupAction = namespace(storeModules.Lookup, Action);

@Component({
    template: require("./template.html").default,
    components: {
        "base-container": () => import("../../components/base-container/BaseContainerComponent.vue"),
        Carousel,
        Slide
    }
})
export default class InfoPageComponent extends Vue {
    forecastService: ForecastServices = new ForecastServices();
    postService: PostServices = new PostServices();
    categoryService: CategoryServices = new CategoryServices();
    currentPosition: any = null;
    navigateTo: number = 0;
    timestamp: any = null;
    temparatureData = null;
    recommendCategoryId: string = "";
    recommendCategoryName: string = "Thông tin khuyến cáo";
    warningCategoryId: string = "";
    warningCategoryName: string = "Cảnh báo thiên tai";
    publishStatusId: string = "";
    publishStatusName: string = "Publish";
    warningPosts: any = [];
    recommendPosts: any = [];
    slideIndex:number = 0;

    @LookupGetter(lookupTypesStore.Get.STATUS) status: IStatus[]
    @LookupAction getLookupData: (type: string) => Promise<void>;

    get address() {
        return this.currentPosition ? this.currentPosition.region : null
    }

    get currentTemp() {
        return this.temparatureData ? this.temparatureData.current : null;
    }

    get minTemp() {
        return this.temparatureData ? this.temparatureData.min : null;
    }
    get maxTemp() {
        return this.temparatureData ? this.temparatureData.max : null;
    }

    get firstWarningPost() {
        return this.warningPosts.length > 0 ? this.warningPosts[0] : {}
    }

    get Recommend() {
        const result = []
        let i, j, chunk = 4;
        for (i = 0, j = this.recommendPosts.length; i < j; i += chunk) {
            const temparray = this.recommendPosts.slice(i, i + chunk);
            result.push(temparray);
        }
        console.log(result);

        return result;
    }

    transformImage(url) {
        return {
            background: `url('${url}')`
        }
    }

    handlePrev() {
        if (this.navigateTo) {
            this.navigateTo -= 1
        }
    }
    handleNext() {
        const totalPage = Math.ceil(this.recommendPosts.length / 4);
        if (this.navigateTo < totalPage) {
            this.navigateTo += 1
        }
    }

    handleViewDetail(postId) {
        this.$router.push({ name: ROUTE_NAME.INFO_DETAIL , params: { id: postId } })
    }

    getNow() {
        const today = new Date();
        const date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
        const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        const dateTime = date + ' ' + time;
        this.timestamp = dateTime;
    }

    async getTemperature() {
        const placeId = this.currentPosition.regionCode;
        const station = STATION.find(x => x.place_id === placeId);
        if(station) {
            await this.forecastService.getTemperatureByStation(station.id).then((res) => {
                const minMaxTemp = DataHelper.getMinMaxTemp(res, DATE.CURRENT);
                this.temparatureData = {
                    current: DataHelper.getTempByHour(res, 0),
                    min: minMaxTemp.min,
                    max: minMaxTemp.max
                }
            }).catch(err => {
                console.log(err);
            })
        } else {
            this.temparatureData = {
                current: '32'
            }
        }
    }

    async mounted() {
        setInterval(this.getNow, 1000);
        this.currentPosition = await displayLocation() as any;
        await this.getTemperature();
        await this.getLookupData(lookupTypesStore.Set.STATUS);
        this.publishStatusId = this.status.find(x => x.name === this.publishStatusName).statusId;

        // Get category
        await this.categoryService.getAllCategories().then((res: any) => {
            for (let obj of res) {
                if (obj.name === this.warningCategoryName) {
                    this.warningCategoryId = obj.categoryId;
                }
                if (obj.name === this.recommendCategoryName) {
                    this.recommendCategoryId = obj.categoryId;
                }
            }
        }).catch(error => {
            console.log(error);
        })

        // Get warning posts
        await this.postService.getPostByCategoryAndStatus(this.warningCategoryId, this.publishStatusId).then((res: any) => {
            this.warningPosts = res;
        }).catch(error => {
            console.log(error);
        })

        // Get recommend posts
        await this.postService.getPostByCategoryAndStatus(this.recommendCategoryId, this.publishStatusId).then((res: any) => {
            this.recommendPosts = res;
        }).catch(error => {
            console.log(error);
        })
    }
}
