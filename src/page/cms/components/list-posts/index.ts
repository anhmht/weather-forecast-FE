import Vue from "vue";
import Component from "vue-class-component";
import { PATH, ROUTE_NAME } from "../../../../constant/route-constant";
import { PostServices } from '../../../../service/post-service/post.service';

@Component({
    template: require("./template.html").default,
})
export default class ListPostComponent extends Vue {
    postService: PostServices = new PostServices();
    posts: any = []

    page: number = 1;

    toCreatePost() {
        this.$router.push(PATH.CREATE_POST);
    }

    editPost(id) {
        this.$router.push({ name: ROUTE_NAME.EDIT_POST , params: { id } })
    }

    async deletePost(id) {
        // this.$router.push({ name: ROUTE_NAME.DELETE_POST , params: { id } })
        await this.postService.deletePostById(id);
    }

    async mounted() {
        try {
            this.posts = await this.postService.getAllPosts();
        } catch (error) {
            console.log(error);
        }
    }
}
