import Vue from "vue";
import Component from "vue-class-component";
import { PATH } from "../../../../constant/route-constant";
import { PostServices } from '../../../../service/post-service/post.service';

@Component({
    template: require("./template.html").default,
})
export default class ListPostComponent extends Vue {
    postService: PostServices = new PostServices();
    posts: any = []

    page: number = 1;

    toCreatePost() {
        this.$router.push(PATH.CREATE_POST)
    }

    editPost() {
        this.$router.push(PATH.CREATE_POST)
    }

    deletePost() {
        this.$router.push(PATH.CREATE_POST)
    }

    async mounted() {
        try {
            this.posts = await this.postService.getAllPosts();
        } catch (error) {
            console.log(error);
        }
    }
}
