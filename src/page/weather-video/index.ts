import Vue from "vue";
import Component from "vue-class-component";
import { ROUTE_NAME } from "../../constant/route-constant";
import { PostServices } from '../../service/post-service/post.service';
import moment from "moment";
import { EVENT_STATUS } from "@/constant/common-constant";

@Component({
    template: require("./template.html").default,
    components: {
        "base-container": () => import("../../components/base-container/BaseContainerComponent.vue"),
        "video-thumb": () => import("./video-thumbnails/VideoThumbnailsComponent.vue"),
    }
})
export default class WeatherVideosComponent extends Vue {
    postService: PostServices = new PostServices();
    
    firstLimit: number = 8;
    page: number = 1;
    mostViewLimit: number = 7;
    dayNumber: number = 7;

    totalItems: number = 0;
    totalPages: number = 0;
    numPostsInPage: number = 0;

    tblData: any = [];
    topPost: any = [];
    mostWatchPosts: any = [];

    isLoadingMore: boolean = false;
    fab:boolean = false;

    get firstPost() {
        return this.topPost.length > 0 ? this.topPost[0] : {}
    }

    get secondListPost() {
        return (this.topPost || []).filter((e, i) => i > 0)
    }

    get isHasmore () {
        return this.totalPages > 0 && this.page < this.totalPages;
    }

    // get totalPageLength () {
    //     return Math.ceil(this.totalItems / 5);
    // }

    // get totalPageVisible() {
    //     if (this.totalPageLength < 5)
    //         return this.totalPageLength;
    //     else
    //         return 5
    // }

    handleViewDetail(postId) {
        this.$router.push({ name: ROUTE_NAME.INFO_DETAIL , params: { id: postId } })
    }

    goToYoutube(linkId) {
        window.open(linkId);
    }

    async loadMore () {
        this.isLoadingMore = true;
        this.page++;
        await this.postService.getPostWithContent(this.$route.params.categoryId, this.$route.params.statusId, this.firstLimit, this.page)
        .then((res: any) => {
            this.isLoadingMore = false;
            if (res) {
                let events = (res.events || []).map(e => {
                    e.datePosted = moment(e.datePosted).format('L');
                    return e;
                });

                // this.tblData = this.page == 1 ? events.filter((e, i) => i > 2) : events;
                this.isLoadingMore = false;

                this.tblData.push(...events);
                
                this.totalItems = res.totalItems;
                this.totalPages = res.totalPages;
            }
            
        }).catch(error => {
            this.isLoadingMore = false;
            this.$errorMessage(error);
        })
    }

    onScroll (e) {
        if (typeof window === 'undefined') return
        const top = window.pageYOffset ||   e.target.scrollTop || 0
        this.fab = top > 20;
    }

    toTop () {
        this.$vuetify.goTo(0);
    }

    async mounted() {
        await this.postService.getPostWithContent(this.$route.params.categoryId, this.$route.params.statusId, this.firstLimit, this.page)
        .then((res: any) => {
            moment.locale('vi');
            if (res) {
                let events = (res.events || []).map(e => {
                    e.datePosted = moment(e.datePosted).format('L');
                    return e;
                });
                this.topPost = events.filter((e, i) => i < 3);
                this.tblData = events.filter((e, i) => i > 2);

                this.totalItems = res.totalItems;
                this.totalPages = res.totalPages;
            }
            
        }).catch(error => {
            this.$errorMessage(error);
        })

        this.postService.getMostView(this.dayNumber, this.page, this.mostViewLimit)
        .then((res: any) => {
            this.mostWatchPosts = res.events.filter(x => x.statusName === EVENT_STATUS.PUBLISH);
        }).catch(error => {
            this.$errorMessage(error);
        })
    }
}
