import Vue from "vue";
import Component from "vue-class-component";
import { IPostSearchParameter, PostSearchParameter } from "@/model/post/post-filter.model";
import { ROUTE_NAME } from "@/constant/route-constant";
import { PostServices } from "@/service/post-service/post.service";
import { CategoryServices } from "@/service/category-service/category.service";

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
    produceCategoryName: string = 'Điều hành sản xuất';
    disasterCategoryName: string = 'Phòng chống thiên tai';
    categoryName: string = null;
    categoryId: string = null;

    get TotalPageVisible() {
        if (this.totalPages < 7)
            return this.totalPages;
        else
            return 7;
    }

    async handleChangeTab(tab) {
        this.activeTab = tab;

        if (this.activeTab === 1) {
            this.categoryName = this.produceCategoryName;
        } else if (this.activeTab === 2) {
            this.categoryName = this.disasterCategoryName;
        }

        await this.getCategoryId();
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
        this.$router.push({
            name: ROUTE_NAME.CREATE_DOCUMENT,
            query: { categoryId: this.searchParams.categoryId }
        });
    }

    editDocument(id) {
        this.$router.push({ name: ROUTE_NAME.EDIT_DOCUMENT , params: { id } })
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

    async getCategoryId() {
        await this.categoryService.getAllCategories().then((res: any) => {
            this.searchParams.categoryId = res.find(x => x.name === this.categoryName).categoryId;
        }).catch(error => {
            console.log(error);
        })
    }

    async getDocuments() {
        await this.postService.getPosts(this.searchParams).then((res: any) => {
            this.documents = res.events;
            this.totalItems = res.totalItems;
            this.totalPages = res.totalPages;
        }).catch(error => {
            console.log(error);
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
