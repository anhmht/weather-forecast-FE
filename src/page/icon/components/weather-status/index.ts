import Vue from "vue";
import Component from "vue-class-component";
import { Getter, Action, namespace } from "vuex-class";
import { storeModules } from "@/store";
import lookupTypesStore from "@/store/lookup/lookup-types.store";
import IStatus from "@/model/status/status.model";
import { PostServices } from "@/service/post-service/post.service";
import { CategoryServices } from "@/service/category-service/category.service";

const LookupGetter = namespace(storeModules.Lookup, Getter);
const LookupAction = namespace(storeModules.Lookup, Action);

@Component({
    template: require("./template.html").default,
})
export default class WeatherStatusComponent extends Vue {
    categoryService: CategoryServices = new CategoryServices();
    postService: PostServices = new PostServices();
    publishStatusId: string = "";
    publishStatusName: string = "Publish";
    weatherStatusCategoryId: string = "";
    weatherStatusCategoryName: string = "Các trạng thái thời tiết";
    weatherStatusPosts: any = [];
    selectedWeatherStatusContent: any = [];
    totalPages: number = 0;
    GET_POST_LIMIT: number = 10;
    GET_POST_PAGE: number = 1;

    @LookupGetter(lookupTypesStore.Get.STATUS) status: IStatus[]
    @LookupAction getLookupData: (type: string) => Promise<void>;

    get TotalPageVisible() {
        if (this.totalPages < 7)
            return this.totalPages;
        else
            return 7;
    }

    loadContent(postId) {
        this.postService.getPostById(postId).then((res: any) => {
            this.selectedWeatherStatusContent = res.content;
        }).catch(error => {
            this.$errorMessage(error);
        })
    }

    async getPosts() {
        await this.postService.getPostByCategoryAndStatus(this.weatherStatusCategoryId, this.publishStatusId, this.GET_POST_LIMIT, this.GET_POST_PAGE).then((res: any) => {
            this.weatherStatusPosts = res.events;
            this.totalPages = res.totalPages;
        }).catch(error => {
            this.$errorMessage(error);
        })
        
        this.loadContent(this.weatherStatusPosts[0].eventId);
    }

    async mounted() {
        await this.getLookupData(lookupTypesStore.Set.STATUS);
        this.publishStatusId = this.status.find(x => x.name === this.publishStatusName).statusId;

        await this.categoryService.getAllCategories().then((res: any) => {
            for (let obj of res) {
                if (obj.name === this.weatherStatusCategoryName) {
                    this.weatherStatusCategoryId = obj.categoryId;
                }
            }
        }).catch(error => {
            this.$errorMessage(error);
        })

        this.getPosts();
    }
}
