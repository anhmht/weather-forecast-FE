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
    totalItems: number = 0;
    totalPages: number = 0;
    currentPage: number = 1;
    limitPerPage: number[] = [5, 10, 15, 20];
    pageSize: number = 5;
    numPostsInPage: number = 0;

    get TotalPageVisible() {
        if (this.totalPages < 7)
            return this.totalPages
        else
            return 7
    }

    toCreatePost() {
        this.$router.push(PATH.CREATE_POST);
    }

    editPost(id) {
        this.$router.push({ name: ROUTE_NAME.EDIT_POST , params: { id } })
    }

    async deletePost(id) {
        await this.postService.deletePostById(id);
    }

    getPostsByLimit(value) {
        this.postService.getAllPosts(value, 1).then((res: any) => {
            this.posts = res.events;
            this.totalItems = res.totalItems;
            this.totalPages = res.totalPages;
            this.currentPage = 1;
            if (this.pageSize <= res.totalItems) {
                this.numPostsInPage = this.pageSize;
            } else {
                this.numPostsInPage = res.totalItems;
            }
        }).catch(error => {
            console.log(error);
        })
    }

    getPostsByPaging() {
        this.postService.getAllPosts(this.pageSize, this.currentPage).then((res: any) => {
            this.posts = res.events;
            this.totalItems = res.totalItems;
            this.totalPages = res.totalPages;
            if (this.pageSize * this.currentPage <= res.totalItems) {
                this.numPostsInPage = this.pageSize * this.currentPage;
            } else {
                this.numPostsInPage = res.totalItems;
            }
        }).catch(error => {
            console.log(error);
        })
    }

    mounted() {
        this.postService.getAllPosts(this.pageSize, this.currentPage).then((res: any) => {
            this.posts = res.events;
            this.totalItems = res.totalItems;
            this.totalPages = res.totalPages;
            if (this.pageSize <= res.totalItems) {
                this.numPostsInPage = this.pageSize;
            } else {
                this.numPostsInPage = res.totalItems;
            }
        }).catch(error => {
            console.log(error);
        })
    }
}
