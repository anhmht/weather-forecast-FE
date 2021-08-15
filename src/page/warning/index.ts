import Vue from "vue";
import Component from "vue-class-component";
import { ROUTE_NAME } from "../../constant/route-constant";
import { PostServices } from '../../service/post-service/post.service';
import IPost from "../../model/post/post.model";
import { Post } from '../../model/post/post.model';
import moment from "moment";
import { EVENT_STATUS } from "@/constant/common-constant";

@Component({
    template: require("./template.html").default,
    components: {
        "base-container": () => import("../../components/base-container/BaseContainerComponent.vue"),
    }
})
export default class WarningPageComponent extends Vue {
    postService: PostServices = new PostServices();
    postModel: IPost = new Post({});
    warningPosts: any = [];

    firstLimit: number = 8;
    limit: number = 5;
    page: number = 1;
    mostViewLimit: number = 7;
    dayNumber: number = 7;

    totalItems: number = 0;
    totalPages: number = 0;
    numPostsInPage: number = 0;

    tblData: any = [];
    topPost: any = [];
    mostWatchPosts: any = [];

    get firstPost() {
        return this.topPost.length > 0 ? this.topPost[0] : {}
    }

    get secondListPost() {
        return (this.topPost || []).filter((e, i) => i > 0)
    }

    get totalPageLength () {
        return Math.ceil(this.totalItems / 5);
    }

    get totalPageVisible() {
        if (this.totalPageLength < 5)
            return this.totalPageLength;
        else
            return 5
    }

    handleViewDetail(postId) {
        this.$router.push({ name: ROUTE_NAME.INFO_DETAIL , params: { id: postId } })
    }

    async fetchData () {
        const lm = this.page == 1? this.firstLimit : this.limit;

        await this.postService.getPostByCategoryAndStatus(this.$route.params.categoryId, this.$route.params.statusId, lm, this.page)
        .then((res: any) => {
            if (res) {
                let events = (res.events || []).map(e => {
                    e.datePosted = moment(e.datePosted).format('L');
                    return e;
                });

                this.tblData = this.page == 1 ? events.filter((e, i) => i > 2) : events;

                this.totalItems = res.totalItems;
                this.totalPages = res.totalPages;
            }
            
        }).catch(error => {
            this.$errorMessage(error);
        })
    }

    async searchByPaging () {
        await this.fetchData();
        if (this.limit * this.page <= this.totalItems) {
            this.numPostsInPage = this.limit * this.page;
        } else {
            this.numPostsInPage = this.totalItems;
        }
    }

    async mounted() {
        await this.postService.getPostByCategoryAndStatus(this.$route.params.categoryId, this.$route.params.statusId, this.firstLimit, this.page)
        .then((res: any) => {
            moment.locale('vi');

            // res.events.forEach( (element) => {
            //     element.datePosted = moment(element.datePosted).format('L');
            // });

            // this.warningPosts = res.events;

            if (res) {
                let events = (res.events || []).map(e => {
                    e.datePosted = moment(e.datePosted).format('L');
                    return e;
                });
                this.topPost = events.filter((e, i) => i < 3);
                this.tblData = events.filter((e, i) => i > 2);

                this.totalItems = res.totalItems;
                this.totalPages = res.totalPages;

                if (this.limit <= this.totalItems) {
                    this.numPostsInPage = this.limit;
                } else {
                    this.numPostsInPage = this.totalItems;
                }
            }

        }).catch(error => {
            this.$errorMessage(error);
        })

        this.postService.getMostView(this.mostViewLimit, this.page, this.dayNumber)
        .then((res: any) => {
            this.mostWatchPosts = res.events.filter(x => x.statusName === EVENT_STATUS.PUBLISH);
        }).catch(error => {
            this.$errorMessage(error);
        })
    }
}
