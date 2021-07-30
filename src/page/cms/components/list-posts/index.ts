import { IPostSearchParameter, PostSearchParameter } from './../../../../model/post/post-filter.model';
import Vue from "vue";
import Component from "vue-class-component";
import { CATEGORY_IDS, CATEGORY_NAMES, ROUTE_NAME } from "../../../../constant/route-constant";
import { PostServices } from '../../../../service/post-service/post.service';
import { Watch } from 'vue-property-decorator';
import NO_IMAGE from '../../../../../static/img/no-image/no-image.png';
import { CMS_MENU } from '@/constant/common-constant';

@Component({
    template: require("./template.html").default,
})
export default class BaseListPostComponent extends Vue {
    postService: PostServices = new PostServices();
    posts: any = []
    totalItems: number = 0;
    totalPages: number = 0;
    listPostTitle: string = '';
    limitPerPage: number[] = [5, 10, 15, 20];
    numPostsInPage: number = 0;
    visibleConfirm: boolean = false;
    selectedId: string = null;
    searchParams: IPostSearchParameter = new PostSearchParameter({});
    categoryType: string = '';

    get TotalPageVisible() {
        if (this.totalPages < 7)
            return this.totalPages
        else
            return 7
    }

    get defaultImage () {
        return NO_IMAGE;
    }

    handleDeletePost(id) {
        this.visibleConfirm = true;
        this.selectedId = id;
    }

    toCreatePost() {
        const category = this.categoryType;
        this.$router.push({ name: ROUTE_NAME.CREATE_POST , params: { category } })
    }

    editPost(id) {
        const category = this.categoryType;
        this.$router.push({ name: ROUTE_NAME.EDIT_POST , params: { category, id } })
    }

    async deletePost() {
        await this.postService.deletePostById(this.selectedId);
        if (this.posts.length === 1) {
            this.searchParams.page -= 1;
        }
        this.getPostsByPaging();
        this.visibleConfirm = false;
        this.$toast.success('Xóa tin thành công');
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

        switch (this.categoryType) {
            case CATEGORY_NAMES.LIST_POST_WEATHER_NEWS:
                this.searchParams.categoryId = CATEGORY_IDS.LIST_POST_WEATHER_NEWS;
                break;
            case CATEGORY_NAMES.LIST_POST_WEATHER_MAP:
                this.searchParams.categoryId = CATEGORY_IDS.LIST_POST_WEATHER_MAP;
                break;
            default:
                this.searchParams.categoryId = null;
                break;
        }

        await this.postService.getPostsByCategory(this.categoryType, this.searchParams).then((res: any) => {
            this.posts = res.events;
            // this.listPostTitle = this.posts[0] ? this.posts[0].categoryName : null;
            this.totalItems = res.totalItems;
            this.totalPages = res.totalPages;
        }).catch(error => {
            this.posts = [];
            this.totalItems = 0;
            this.totalPages = 0;

            this.$errorMessage(error);
        })
    }

    onImgError (event) {
        event.target.src = NO_IMAGE;
    }

    setListPostTitle () {
        let key = Object.keys(CATEGORY_NAMES).find(key => CATEGORY_NAMES[key] === this.categoryType);
        return key ? CMS_MENU[key] : '';
    }

    async mounted() {
        if (this.$route.params.category) {
            this.categoryType =  this.$route.params.category as any;
        }

        this.listPostTitle = this.setListPostTitle();
        await this.getPosts();

        if (this.searchParams.limit <= this.totalItems) {
            this.numPostsInPage = this.searchParams.limit;
        } else {
            this.numPostsInPage = this.totalItems;
        }
    }

    @Watch('$route.params.category')
    async handleChangeCategory(val, old) {
        if(val && val !== old) {
            this.categoryType =  this.$route.params.category as any;
            this.listPostTitle = this.setListPostTitle();
            await this.getPosts();

            if (this.searchParams.limit <= this.totalItems) {
                this.numPostsInPage = this.searchParams.limit;
            } else {
                this.numPostsInPage = this.totalItems;
            }
        }
    }
}
