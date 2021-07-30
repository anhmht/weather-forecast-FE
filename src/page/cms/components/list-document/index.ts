import Vue from "vue";
import Component from "vue-class-component";
import { Getter, namespace } from "vuex-class";
import { storeModules } from "@/store";
import { IPostSearchParameter, PostSearchParameter } from "@/model/post/post-filter.model";
import { CATEGORY_NAMES, ROUTE_NAME } from "@/constant/route-constant";
import { PostServices } from "@/service/post-service/post.service";
import { CategoryServices } from "@/service/category-service/category.service";
import userTypesStore from "@/store/user/user-types.store";
import { USER_ROLE } from "@/constant/common-constant";


const UserGetter = namespace(storeModules.User, Getter);
@Component({
    template: require("./template.html").default,
})
export default class ListDocumentComponent extends Vue {
    documents: any = []
    totalItems: number = 0;
    totalPages: number = 0;
    limitPerPage: number[] = [5, 10, 15, 20];
    numDocumentsInPage: number = 0;
    visibleConfirm: boolean = false;
    selectedId: string = null;
    activeTab: number = 1
    searchParams: IPostSearchParameter = new PostSearchParameter({});
    postService: PostServices = new PostServices();
    categoryService: CategoryServices = new CategoryServices();
    categoryType: string = CATEGORY_NAMES.LIST_POST_DIEU_HANH_SAN_XUAT;

    @UserGetter(userTypesStore.Get.Auth) userConfig: any;

    get isAdmin () {
        if (this.userConfig && this.userConfig['roles']) {
            return !!this.userConfig['roles'].find(r => r === USER_ROLE.SUPER || r === USER_ROLE.KTTV);
        }
        return false;
    }

    get TotalPageVisible() {
        if (this.totalPages < 7)
            return this.totalPages;
        else
            return 7;
    }

    async handleChangeTab(tab) {
        this.activeTab = tab;

        if (this.activeTab === 1) {
            this.categoryType = CATEGORY_NAMES.LIST_POST_DIEU_HANH_SAN_XUAT;
        } else if (this.activeTab === 2) {
            this.categoryType = CATEGORY_NAMES.LIST_POST_PHONG_CHONG_THIEN_TAI;
        }

        await this.getDocuments();

        if (this.searchParams.limit <= this.totalItems) {
            this.numDocumentsInPage = this.searchParams.limit;
        } else {
            this.numDocumentsInPage = this.totalItems;
        }
    }

    handleDeleteDocument(id) {
        this.visibleConfirm = true;
        this.selectedId = id;
    }

    async deletePost() {
        await this.postService.deletePostById(this.selectedId);
        if (this.documents.length === 1) {
            this.searchParams.page -= 1;
        }
        this.getDocumentsByPaging();
        this.visibleConfirm = false;
        this.$toast.success('Xóa tin thành công');
    }

    toCreateDocument() {
        const category = this.categoryType;
        this.$router.push({
            name: ROUTE_NAME.CREATE_DOCUMENT,
            params: { category }
        });
    }

    editDocument(id) {
        const category = this.categoryType;
        this.$router.push({ name: ROUTE_NAME.EDIT_DOCUMENT , params: { category, id } })
    }

    async deleteDocument() {
        await this.postService.deletePostById(this.selectedId);
        if (this.documents.length === 1) {
            this.searchParams.page -= 1;
        }
        this.getDocumentsByPaging();
        this.visibleConfirm = false;
        this.$toast.success('Xóa tin thành công');
    }

    async getDocumentsByLimit(value = null) {
        this.searchParams.page = 1;
        await this.getDocuments();
        if (this.searchParams.limit <= this.totalItems) {
            this.numDocumentsInPage = this.searchParams.limit;
        } else {
            this.numDocumentsInPage = this.totalItems;
        }
    }

    async getDocumentsByPaging() {
        await this.getDocuments();
        if (this.searchParams.limit * this.searchParams.page <= this.totalItems) {
            this.numDocumentsInPage = this.searchParams.limit * this.searchParams.page;
        } else {
            this.numDocumentsInPage = this.totalItems;
        }
    }

    async getDocuments() {
        await this.postService.getPostsByCategory(this.categoryType, this.searchParams).then((res: any) => {
            this.documents = res.events;
            this.totalItems = res.totalItems;
            this.totalPages = res.totalPages;
        }).catch(error => {
            this.$errorMessage(error);
            this.documents = [];
            this.totalItems = 0;
            this.totalPages = 0;
        })
    }

    async mounted() {
        this.handleChangeTab(1);
        if (this.searchParams.limit <= this.totalItems) {
            this.numDocumentsInPage = this.searchParams.limit;
        } else {
            this.numDocumentsInPage = this.totalItems;
        }
    }
}
