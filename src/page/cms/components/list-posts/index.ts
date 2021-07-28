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
        this.$router.push({
            name: ROUTE_NAME.CREATE_POST,
            query: { categoryId: this.$route.query.categoryId}
        });
    }

    editPost(id) {
        this.$router.push({ name: ROUTE_NAME.EDIT_POST , params: { id } })
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

            console.log(error);
        })
    }

    onImgError (event) {
        event.target.src = NO_IMAGE;
    }

    setListPostTitle (type:string) {
        switch (type) {
            case CATEGORY_NAMES.LIST_POST_WEATHER_NEWS:
                return CMS_MENU.LIST_POST_WEATHER_NEWS;

            case CATEGORY_NAMES.LIST_POST_WEATHER_MAP:
                return CMS_MENU.LIST_POST_WEATHER_MAP;
                
            case CATEGORY_NAMES.LIST_POST_CANH_BAO_THIEN_TAI:
                return CMS_MENU.LIST_POST_CANH_BAO_THIEN_TAI;
                
            case CATEGORY_NAMES.LIST_POST_THONG_TIN_KHUYEN_CAO:
                return CMS_MENU.LIST_POST_THONG_TIN_KHUYEN_CAO;
                
            case CATEGORY_NAMES.LIST_POST_KT_VH_XH:
                return CMS_MENU.LIST_POST_KT_VH_XH;
                
            case CATEGORY_NAMES.LIST_POST_THOI_TIET_DU_LICH:
                return CMS_MENU.LIST_POST_THOI_TIET_DU_LICH;
                
            case CATEGORY_NAMES.LIST_POST_THOI_TIET_NONG_VU:
                return CMS_MENU.LIST_POST_THOI_TIET_NONG_VU;
                
            case CATEGORY_NAMES.LIST_POST_THOI_TIET_GIAO_THONG:
                return CMS_MENU.LIST_POST_THOI_TIET_GIAO_THONG;
                
            case CATEGORY_NAMES.LIST_POST_THOI_TIET_NGUY_HIEM:
                return CMS_MENU.LIST_POST_THOI_TIET_NGUY_HIEM;
                
            case CATEGORY_NAMES.LIST_POST_THUY_VAN:
                return CMS_MENU.LIST_POST_THUY_VAN;
                
            case CATEGORY_NAMES.LIST_POST_TRANG_THAI_THOI_TIET:
                return CMS_MENU.LIST_POST_TRANG_THAI_THOI_TIET;
                
            default:
                return '';
        }
    }

    async mounted() {
        if (this.$route.params.category) {
            this.categoryType =  this.$route.params.category as any;
        }

        this.listPostTitle = this.setListPostTitle(this.categoryType);
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
            await this.getPosts();

            if (this.searchParams.limit <= this.totalItems) {
                this.numPostsInPage = this.searchParams.limit;
            } else {
                this.numPostsInPage = this.totalItems;
            }
        }
    }
}
