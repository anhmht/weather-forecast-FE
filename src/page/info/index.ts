import { WEATHER_TYPE } from '@/constant/forcast-station-constant';
import { Action } from 'vuex-class';
import { Getter } from 'vuex-class';
import { namespace } from 'vuex-class';
import Vue from "vue";
import Component from "vue-class-component";
import { Carousel, Slide } from 'vue-carousel';
import { STATION, REGION, WIND_DIRECTION } from "@/constant/forcast-station-constant";
import { ROUTE_NAME } from "../../constant/route-constant";
import { PostServices } from '../../service/post-service/post.service';
import { CategoryServices } from '../../service/category-service/category.service';
import { displayLocation } from "@/utils/location-helper";
import { storeModules } from '@/store';
import lookupTypesStore from '@/store/lookup/lookup-types.store';
import IStatus from '@/model/status/status.model';
import moment from 'moment';
import { ICON } from '@/constant/icon-constant';
import { ForecastSearchParam, IForecastSearchParam } from '@/model/forecast';
import { WeatherServices } from '@/service/weather-service/weather.service';
import { DataHelper } from '@/utils/data-helper';

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
    currentDate: any = null;
    temparatureData = null;
    weatherNewsCategoryId: string = "";
    weatherNewsCategoryName: string = "Bản tin thời tiết";
    weatherMapCategoryId: string = "";
    weatherMapCategoryName: string = "Bản đồ thời tiết";
    recommendCategoryId: string = "";
    recommendCategoryName: string = "Thông tin khuyến cáo";
    warningCategoryId: string = "";
    warningCategoryName: string = "Cảnh báo thiên tai";
    otherCategoryId: string = "";
    otherCategoryName: string = "Kinh tế - Văn hóa - Xã hội";
    weatherTravelCategoryId: string = "";
    weatherTravelCategoryName: string = "Thời tiết du lịch";
    weatherAgricultureCategoryId: string = "";
    weatherAgricultureCategoryName: string = "Thời tiết nông vụ";
    weatherTrafficCategoryId: string = "";
    weatherTrafficCategoryName: string = "Thời tiết giao thông";
    weatherDangerCategoryId: string = "";
    weatherDangerCategoryName: string = "Thời tiết nguy hiểm";
    publishStatusId: string = "";
    publishStatusName: string = "Publish";
    warningPosts: any = [];
    recommendPosts: any = [];
    otherPosts: any = [];
    weatherNewsPosts: any = [];
    firstWeatherMapPost: any = [];
    weatherMapPosts: any = [];
    slideIndex:number = 0;
    region: any = null;
    allRegions: any = [];
    searchParam: IForecastSearchParam = new ForecastSearchParam();
    firstWeatherNewsPostId: string = null;
    firstWeatherMapPostId: string = null;

    @LookupGetter(lookupTypesStore.Get.STATUS) status: IStatus[]
    @LookupAction getLookupData: (type: string) => Promise<void>;

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

    get YouTubeVideoId() {
        if (this.firstWeatherMapPost) {
            let id = this.firstWeatherMapPost.content.split(/(?:=|&)+/)[1];
            return 'https://www.youtube.com/embed/' + id;
        }

        return;
    }

    getStationIdByRegion(regionCode) {
        const foundRegion = REGION.find(x => x.placeId === regionCode);
        if (foundRegion) {
            const provinceId = foundRegion.provinceIds;
            let stationId: any = [];
            for (let i = 0; i < provinceId.length; i++) {
                const foundStation = STATION.find(x => x.place_id === provinceId[i]);
                if (foundStation) {
                    stationId.push(foundStation.id);
                }
            }

            return stationId;
        }

        return;
    }

    getMostFrequentData(inputData, type) {
        if (type === WEATHER_TYPE.Weather) {
            let filteredDayData: string[] = [];
            let filteredNightData: string[] = [];
            let mostFreqDay: string = null;
            let mostFreqNight: string = null;

            for (let i = 0; i < inputData.length; i++) {
                const currentElement = inputData[i];
                let hours = Object.keys(currentElement).filter(x => x.includes('_'));
                hours = hours.sort((a,b) => {
                    return parseInt(a.substr(1), 10) - parseInt(b.substr(1), 10);
                });
                for (let j = 0; j < 24; j++) {
                    if (j >= 6 && j <= 18) {
                        filteredDayData.push(currentElement[hours[j]]);
                    }
                    else {
                        filteredNightData.push(currentElement[hours[j]]);
                    }
                }
            }
            mostFreqDay = DataHelper.getMostFrequentByHorizontal(filteredDayData);
            mostFreqNight = DataHelper.getMostFrequentByHorizontal(filteredNightData);

            return {mostFreqDay, mostFreqNight};
        } else {
            let filteredData: any = [];
            let mostFreqData: any = null;

            for (let i = 0; i < inputData.length; i++) {
                const currentElement = inputData[i];
                let hours = Object.keys(currentElement).filter(x => x.includes('_'));
                hours = hours.sort((a,b) => {
                    return parseInt(a.substr(1), 10) - parseInt(b.substr(1), 10);
                });
                for (let j = 0; j < 24; j++) {
                    filteredData.push(currentElement[hours[j]]);
                }
            }
            mostFreqData = DataHelper.getMostFrequentByHorizontal(filteredData);

            return mostFreqData;
        }
    }

    getMinMaxData(inputData) {
        let filteredData: number[] = [];
        let min: number = null;
        let max: number = null;

        for (let i = 0; i < inputData.length; i++) {
            const currentElement = inputData[i];
            let hours = Object.keys(currentElement).filter(x => x.includes('_'));
            hours = hours.sort((a,b) => {
                return parseInt(a.substr(1), 10) - parseInt(b.substr(1), 10);
            });
            for (let j = 0; j < 24; j++) {
                filteredData.push(currentElement[hours[j]]);
            }
        }
        min = Math.min(...filteredData);
        max = Math.max(...filteredData);

        return {min, max};
    }

    getHorizontal(stationId) {
        this.searchParam = new ForecastSearchParam();
        if (Array.isArray(stationId)) {
            this.searchParam.stationIds = stationId;
        } else {
            this.searchParam.stationIds = [stationId];
        }
        this.searchParam.fromDate = moment().format("YYYY-MM-DD") + 'T00:00:00';
        this.searchParam.toDate = moment().format("YYYY-MM-DD") + 'T00:00:00';
        this.searchParam.weatherTypes = [
            WEATHER_TYPE.Weather,
            WEATHER_TYPE.WindDirection,
            WEATHER_TYPE.WindRank,
            WEATHER_TYPE.Temperature
        ];

        return new Promise((resolve, reject) => {
            this.weatherService.getHorizontal(this.searchParam).then((res: any) => {
                let iconArray = res.getWeatherInformationHorizontals.filter(x => x.weatherType === WEATHER_TYPE.Weather && x.refDate === this.searchParam.fromDate);
                let windDirArray = res.getWeatherInformationHorizontals.filter(x => x.weatherType === WEATHER_TYPE.WindDirection && x.refDate === this.searchParam.fromDate);
                let windRankArray = res.getWeatherInformationHorizontals.filter(x => x.weatherType === WEATHER_TYPE.WindRank && x.refDate === this.searchParam.fromDate);
                let tempArray = res.getWeatherInformationHorizontals.filter(x => x.weatherType === WEATHER_TYPE.Temperature && x.refDate === this.searchParam.fromDate);

                let mostFreqIcon = this.getMostFrequentData(iconArray, WEATHER_TYPE.Weather);
                let mostFreqWindDir = this.getMostFrequentData(windDirArray, WEATHER_TYPE.WindDirection);
                let mostFreqWindRank = this.getMostFrequentData(windRankArray, WEATHER_TYPE.WindRank);
                let tempRange = this.getMinMaxData(tempArray);

                resolve({mostFreqIcon, mostFreqWindDir, mostFreqWindRank, tempRange});
            }).catch(err => {
                console.log(err);
            })
        })
    }

    handleChangeRegion(value) {
        const currentHour = new Date().getHours();
        let iconDay = null;
        let iconNight = null;
        let iconDayUrl = null;
        let iconNightUrl = null;
        let weatherDescDay = null;
        let weatherDescNight = null;
        let windDir = null;
        let stationId = null;

        if (value.region) {
            stationId = this.getStationIdByRegion(value.region);
        } else if (value.currentPosition) {
            stationId = value.currentPosition;
        }

        this.getHorizontal(stationId).then((res: any) => {
            iconDay = ICON.find(x => x.id === res.mostFreqIcon.mostFreqDay);
            if (iconDay) {
                iconDayUrl = iconDay.url;
                weatherDescDay = iconDay.description;
            }

            iconNight = ICON.find(x => x.id === res.mostFreqIcon.mostFreqNight);
            if (iconNight) {
                iconNightUrl = iconNight.url;
                weatherDescNight = iconNight.description;
            }

            windDir = WIND_DIRECTION[res.mostFreqWindDir].full;

            if (currentHour >= 6 && currentHour <= 18) {
                this.temparatureData = {
                    ... this.temparatureData,
                    icon: iconDayUrl
                }
            } else {
                this.temparatureData = {
                    ... this.temparatureData,
                    icon: iconNightUrl
                }
            }
            this.temparatureData = {
                ... this.temparatureData,
                desc: weatherDescDay + ". " + weatherDescNight
                    + ". Hướng gió " + windDir + ", " + res.mostFreqWindRank + ". "
                    + "Nhiệt độ thấp nhất: " + res.tempRange.min + "°C. "
                    + "Nhiệt độ cao nhất: " + res.tempRange.max + "°C."
            }
        }).catch(err => {
            console.log(err);
        })
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

    viewAllWeatherTravel() {
        this.$router.push({ name: ROUTE_NAME.WARNING ,
            params: { categoryId: this.weatherTravelCategoryId, statusId: this.publishStatusId } })
    }

    viewAllWeatherAgriculture() {
        this.$router.push({ name: ROUTE_NAME.WARNING ,
            params: { categoryId: this.weatherAgricultureCategoryId, statusId: this.publishStatusId } })
    }

    viewAllWeatherTraffic() {
        this.$router.push({ name: ROUTE_NAME.WARNING ,
            params: { categoryId: this.weatherTrafficCategoryId, statusId: this.publishStatusId } })
    }

    viewAllWeatherDanger() {
        this.$router.push({ name: ROUTE_NAME.WARNING ,
            params: { categoryId: this.weatherDangerCategoryId, statusId: this.publishStatusId } })
    }

    getNow() {
        this.timestamp = moment().format('DD/MM/YYYY HH:mm:ss');
        this.currentDate = moment().format('DD/MM/YYYY');
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

    goToYoutube(linkId) {
        window.open(linkId);
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
                if (obj.name === this.weatherTravelCategoryName) {
                    this.weatherTravelCategoryId = obj.categoryId;
                }
                if (obj.name === this.weatherAgricultureCategoryName) {
                    this.weatherAgricultureCategoryId = obj.categoryId;
                }
                if (obj.name === this.weatherTrafficCategoryName) {
                    this.weatherTrafficCategoryId = obj.categoryId;
                }
                if (obj.name === this.weatherDangerCategoryName) {
                    this.weatherDangerCategoryId = obj.categoryId;
                }
                if (obj.name === this.weatherNewsCategoryName) {
                    this.weatherNewsCategoryId = obj.categoryId;
                }
                if (obj.name === this.weatherMapCategoryName) {
                    this.weatherMapCategoryId = obj.categoryId;
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

        // Get weather news posts
        await this.postService.getPostWithContent(this.weatherNewsCategoryId, this.publishStatusId).then((res: any) => {
            this.weatherNewsPosts = res[0];
        }).catch(error => {
            console.log(error);
        })

        // Get weather map posts
        await this.postService.getPostWithContent(this.weatherMapCategoryId, this.publishStatusId).then((res: any) => {
            this.firstWeatherMapPost = res[0];
            this.weatherMapPosts = res; 
        }).catch(error => {
            console.log(error);
        })
        
        setInterval(this.getNow, 1000);
        this.currentPosition = await displayLocation() as any;

        this.allRegions = [
            {
                title: this.currentPosition ? STATION.find(x => x.place_id === this.currentPosition.regionCode).ten : null,
                icon: null,
                desc: null,
                region: null,
                currentPosition: this.currentPosition ? STATION.find(x => x.place_id === this.currentPosition.regionCode).id : null
            },
            {
                title: 'Phía Tây Bắc Bộ',
                icon: null,
                desc: null,
                region: 'TBB',
                currentPosition: null
            },
            {
                title: 'Phía Đông Bắc Bộ',
                icon: null,
                desc: null,
                region: 'DBB',
                currentPosition: null
            },
            {
                title: 'Đồng bằng sông Hồng',
                icon: null,
                desc: null,
                region: 'DBSH',
                currentPosition: null
            },
            {
                title: 'Thanh Hoá - Thừa Thiên Huế',
                icon: null,
                desc: null,
                region: 'BTB',
                currentPosition: null
            },
            {
                title: 'Đà Nẵng đến Bình Thuận',
                icon: null,
                desc: null,
                region: 'NTB',
                currentPosition: null
            },
            {
                title: 'Tây Nguyên',
                icon: null,
                desc: null,
                region: 'TN',
                currentPosition: null
            },
            {
                title: 'Đông Nam Bộ',
                icon: null,
                desc: null,
                region: 'DNB',
                currentPosition: null
            },
            {
                title: 'Tây Nam Bộ',
                icon: null,
                desc: null,
                region: 'TNB',
                currentPosition: null
            }
        ];

        this.region = this.allRegions[0];
        this.handleChangeRegion(this.region);
    }
}
