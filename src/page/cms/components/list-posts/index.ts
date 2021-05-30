import { IPostSearchParameter, PostSearchParameter } from './../../../../model/post/post-filter.model';
import Vue from "vue";
import Component from "vue-class-component";
import { ROUTE_NAME } from "../../../../constant/route-constant";
import { PostServices } from '../../../../service/post-service/post.service';
import { Watch } from 'vue-property-decorator';

@Component({
    template: require("./template.html").default,
})
export default class ListPostComponent extends Vue {
    postService: PostServices = new PostServices();
    posts: any = []
    totalItems: number = 0;
    totalPages: number = 0;
    listPostTitle: string = '';
    limitPerPage: number[] = [5, 10, 15, 20];
    numPostsInPage: number = 0;

    searchParams: IPostSearchParameter = new PostSearchParameter({});

    get TotalPageVisible() {
        if (this.totalPages < 7)
            return this.totalPages
        else
            return 7
    }

    toCreatePost() {
        this.$router.push({
            name: ROUTE_NAME.CREATE_POST,
            query: { categoryId: this.$route.query.categoryId}
        });
    }

    editPost(id) {
        this.$router.push({ name: ROUTE_NAME.EDIT_POST , params: { id } })
    }

    async deletePost(id) {
        await this.postService.deletePostById(id);
        if (this.posts.length === 1) {
            this.searchParams.page -= 1;
        }
        this.getPostsByPaging();
    }

    async getPostsByLimit(value = null) {
        this.searchParams.page = 1;
        await this.getPosts();
        if (this.searchParams.limit <= this.totalItems) {
            this.numPostsInPage = this.searchParams.limit;
        } else {
            this.numPostsInPage = this.totalItems;
        }
    }

    async getPostsByPaging() {
        await this.getPosts();
        if (this.searchParams.limit * this.searchParams.page <= this.totalItems) {
            this.numPostsInPage = this.searchParams.limit * this.searchParams.page;
        } else {
            this.numPostsInPage = this.totalItems;
        }
    }

    async getPosts() {
        await this.postService.getPosts(this.searchParams).then((res: any) => {
            this.posts = res.events;
            this.listPostTitle = this.posts[0] ? this.posts[0].categoryName : null;
            this.totalItems = res.totalItems;
            this.totalPages = res.totalPages;
        }).catch(error => {
            console.log(error);
        })
    }

    async mounted() {
        if (this.$route.query.categoryId) {
            this.searchParams.categoryId = this.$route.query.categoryId as any;
        }
        await this.getPosts();
        if (this.searchParams.limit <= this.totalItems) {
            this.numPostsInPage = this.searchParams.limit;
        } else {
            this.numPostsInPage = this.totalItems;
        }
    }

    @Watch('$route.query.categoryId')
    handleChangeCategory(val, old) {
        if(val && val !== old) {
            this.searchParams = new PostSearchParameter({
                categoryId: val
            });
            this.getPosts();
        }
    }
}
