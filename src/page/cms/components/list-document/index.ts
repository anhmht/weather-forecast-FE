import Vue from "vue";
import Component from "vue-class-component";
import { IPostSearchParameter, PostSearchParameter } from "@/model/post/post-filter.model";
import { ROUTE_NAME } from "@/constant/route-constant";

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
    activeTab: number = 1
    searchParams: IPostSearchParameter = new PostSearchParameter({});

    get TotalPageVisible() {
        return 7;
    }

    handleChangeTab(tab) {
        this.activeTab = tab;
    }

    handleDeleteDocument(id) {
        
    }

    toCreateDocument() {
        this.$router.push(ROUTE_NAME.CREATE_DOCUMENT);
    }

    editDocument(id) {
        
    }

    async deleteDocument() {

    }

    async getDocumentsByLimit(value = null) {

    }

    async getDocumentsByPaging() {

    }

    async getDocuments() {

    }

    async mounted() {

    }
}
