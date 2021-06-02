import Vue from "vue";
import Component from "vue-class-component";
import { ROUTE_NAME } from "../../constant/route-constant";
import { PostServices } from '../../service/post-service/post.service';
import IPost from "../../model/post/post.model";
import { Post } from '../../model/post/post.model';
import moment from "moment";
import image from "../../../static/img/social-page/item.jpg";

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

    mostWatchPosts: any = [
        {
            imageUrl: image,
            title: "Áp thấp nhiệt đới mạnh lên thành bão, Trung bộ mưa lũ lớn"
        },
        {
            imageUrl: image,
            title: "Áp thấp nhiệt đới mạnh lên thành bão, Trung bộ mưa lũ lớn"
        },
        {
            imageUrl: image,
            title: "Áp thấp nhiệt đới mạnh lên thành bão, Trung bộ mưa lũ lớn"
        },
        {
            imageUrl: image,
            title: "Áp thấp nhiệt đới mạnh lên thành bão, Trung bộ mưa lũ lớn"
        },
        {
            imageUrl: image,
            title: "Áp thấp nhiệt đới mạnh lên thành bão, Trung bộ mưa lũ lớn"
        },
    ];

    handleViewDetail(postId) {
        this.$router.push({ name: ROUTE_NAME.INFO_DETAIL , params: { id: postId } })
    }

    async mounted() {
        await this.postService.getPostByCategoryAndStatus(this.$route.params.categoryId, this.$route.params.statusId)
        .then((res: any) => {
            moment.locale('vi');

            res.forEach( (element) => {
                element.datePosted = moment(element.datePosted).format('L');
            });

            this.warningPosts = res;
        }).catch(error => {
            console.log(error);
        })
    }
}
