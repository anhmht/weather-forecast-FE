import { WEATHER_TYPE } from '@/constant/forcast-station-constant';
import { Action } from 'vuex-class';
import { Getter } from 'vuex-class';
import { namespace } from 'vuex-class';
import Vue from "vue";
import Component from "vue-class-component";
import { Carousel, Slide } from 'vue-carousel';
import { STATION } from "@/constant/forcast-station-constant";
import { ROUTE_NAME } from "../../constant/route-constant";
import { PostServices } from '../../service/post-service/post.service';
import { CategoryServices } from '../../service/category-service/category.service';
import { displayLocation } from "@/utils/location-helper";
import { storeModules } from '@/store';
import lookupTypesStore from '@/store/lookup/lookup-types.store';
import IStatus from '@/model/status/status.model';
import moment from 'moment';
import { ICON } from '@/constant/icon-constant';
import { ForecastSearchParam } from '@/model/forecast';
import { WeatherServices } from '@/service/weather-service/weather.service';

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
    weatherService: WeatherServices = new WeatherServices();
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
    otherCategoryId: string = "";
    otherCategoryName: string = "Kinh tế - Văn hóa - Xã hội";
    publishStatusId: string = "";
    publishStatusName: string = "Publish";
    warningPosts: any = [];
    recommendPosts: any = [];
    otherPosts: any = [];
    slideIndex:number = 0;

    @LookupGetter(lookupTypesStore.Get.STATUS) status: IStatus[]
    @LookupAction getLookupData: (type: string) => Promise<void>;

    get address() {
        return this.currentPosition ? STATION.find(x => x.place_id === this.currentPosition.regionCode).ten : null
    }

    get currentTemp() {
        return this.temparatureData ? this.temparatureData.current : null;
    }

    get currentIcon() {
        return this.temparatureData ? this.temparatureData.icon : null;
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

    get Other() {
        const result = []
        let i, j, chunk = 4;
        for (i = 0, j = this.otherPosts.length; i < j; i += chunk) {
            const temparray = this.otherPosts.slice(i, i + chunk);
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

    viewAllWarning() {
        this.$router.push({ name: ROUTE_NAME.WARNING ,
            params: { categoryId: this.warningCategoryId, statusId: this.publishStatusId } })
    }

    getNow() {
        this.timestamp = moment().format('DD/MM/YYYY HH:mm:ss');
    }

    scrollTo(className) {
        var element = document.getElementsByClassName(className)[0];
        var headerOffset = 90;
        var elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
        var offsetPosition = elementPosition - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
        });
    }

    getIcon() {
        const placeId = this.currentPosition.regionCode;
        const station = STATION.find(x => x.place_id === placeId);
        if (station) {
            const searchParam = new ForecastSearchParam();
            searchParam.stationIds = [station.id];
            searchParam.fromDate = moment().format("YYYY-MM-DD");
            searchParam.toDate = moment(searchParam.fromDate).add(1, 'days').subtract(1, 'minutes').format();
            searchParam.weatherTypes = [WEATHER_TYPE.Weather];
            this.weatherService.getHorizontal(searchParam).then((res: any) => {
                const data = res.getWeatherInformationHorizontals.find(x => x.weatherType === WEATHER_TYPE.Weather);
                let hour = new Date().getHours();
                const iconId = data[`_${hour ? hour : 1}`]
                const icon = ICON.find(x => x.id === iconId)
                if (icon) {
                    this.temparatureData = {
                        ... this.temparatureData,
                        icon: icon.url
                    }
                }

            }).catch(err => {
                console.log(err);
            })
        } else {
            this.temparatureData = {
                ... this.temparatureData,
                icon: null
            }
        }
    }

    getTemperature() {
        const placeId = this.currentPosition.regionCode;
        const station = STATION.find(x => x.place_id === placeId);
        if(station) {
            const searchParam = new ForecastSearchParam();
            searchParam.stationIds = [station.id];
            searchParam.fromDate = moment().format("YYYY-MM-DD");
            searchParam.toDate = moment(searchParam.fromDate).add(1, 'days').subtract(1, 'minutes').format();
            searchParam.weatherTypes = [WEATHER_TYPE.Temperature];
            this.weatherService.getDetail(searchParam).then((res: any) => {
                const minMaxTemp = res.weatherInformationByStations.find(x => x.weatherType === WEATHER_TYPE.Temperature);
                this.temparatureData = {
                    ... this.temparatureData,
                    current: minMaxTemp.weatherInformationByDays[0].weatherInformationByHours.find(x => x.hour === moment().hour()).value,
                    min: minMaxTemp.minValue,
                    max: minMaxTemp.maxValue
                }
            }).catch(err => {
                console.log(err);
            })
        } else {
            this.temparatureData = {
                ... this.temparatureData,
                current: '32'
            }
        }
    }

    async mounted() {
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
                if (obj.name === this.otherCategoryName) {
                    this.otherCategoryId = obj.categoryId;
                }
            }
        }).catch(error => {
            console.log(error);
        })

        // Get warning posts
        this.postService.getPostByCategoryAndStatus(this.warningCategoryId, this.publishStatusId).then((res: any) => {
            this.warningPosts = res;
        }).catch(error => {
            console.log(error);
        })

        // Get recommend posts
        this.postService.getPostByCategoryAndStatus(this.recommendCategoryId, this.publishStatusId).then((res: any) => {
            this.recommendPosts = res;
        }).catch(error => {
            console.log(error);
        })

        // Get other posts (Economic - Culture - Society)
        this.postService.getPostByCategoryAndStatus(this.otherCategoryId, this.publishStatusId).then((res: any) => {
            this.otherPosts = res;
        }).catch(error => {
            console.log(error);
        })
        setInterval(this.getNow, 1000);
        this.currentPosition = await displayLocation() as any;
        this.getTemperature();
        this.getIcon();
    }
}
