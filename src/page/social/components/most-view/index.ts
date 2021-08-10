import { ROUTE_NAME } from '@/constant/route-constant';
import { PostServices } from '@/service/post-service/post.service';
import Vue from 'vue';
import Component from 'vue-class-component';

const GET_MOST_VIEW_LIMIT: number = 5;
const GET_MOST_VIEW_PAGE: number = 1;
const GET_MOST_VIEW_DAY_NUMBER: number = 7;
const GET_MOST_VIEW_STATUS_NAME: string = 'Publish';

@Component({
    template: require("./template.html").default,
})
export default class MostViewCOmponent extends Vue {
    mostWatchPosts: any = [];
    postService: PostServices = new PostServices();

    handleViewDetail(postId) {
        this.$router.push({ name: ROUTE_NAME.INFO_DETAIL, params: { id: postId } })
    }

    mounted() {
        this.postService.getMostView(GET_MOST_VIEW_LIMIT, GET_MOST_VIEW_PAGE, GET_MOST_VIEW_DAY_NUMBER)
            .then((res: any) => {
                this.mostWatchPosts = res.events.filter(x => x.statusName === GET_MOST_VIEW_STATUS_NAME);
            }).catch(error => {
                this.$errorMessage(error);
            })
    }
}