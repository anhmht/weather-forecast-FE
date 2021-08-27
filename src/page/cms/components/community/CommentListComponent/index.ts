import BaseApprovalListComponent from "../BaseApprovaListComponent/base-approval-list";
import Component from "vue-class-component";
import { Watch } from "vue-property-decorator";

@Component({
    template: require("./template.html").default,
})
export default class CommentListComponent extends BaseApprovalListComponent {

    async fetchData () {
        await this.getCommentForApproval();

        if (this.searchParams.limit <= this.totalItems) {
            this.numPostsInPage = this.searchParams.limit;
        } else {
            this.numPostsInPage = this.totalItems;
        }
        this.$forceUpdate();
    }

    async getCommentForApproval () {
        await this.socialService.getCommentForApproval(this.searchParams).then((res: any) => {
            this.dtSource = res.items;

            this.totalItems = res.totalItems;
            this.totalPages = res.totalPages;
        }).catch(err => {
            console.log(err);
        })
    }

    async searchByLimit () {
        this.searchParams.page = 1;
        await this.fetchData();
        if (this.searchParams.limit <= this.totalItems) {
            this.numPostsInPage = this.searchParams.limit;
        } else {
            this.numPostsInPage = this.totalItems;
        }
    }

    async searchByPaging () {
        await this.fetchData();
        if (this.searchParams.limit * this.searchParams.page <= this.totalItems) {
            this.numPostsInPage = this.searchParams.limit * this.searchParams.page;
        } else {
            this.numPostsInPage = this.totalItems;
        }
    }
    
    async mounted() {
        this.searchParams.statusIds = this.status;
        await this.getCommentForApproval();

        if (this.searchParams.limit <= this.totalItems) {
            this.numPostsInPage = this.searchParams.limit;
        } else {
            this.numPostsInPage = this.totalItems;
        }
    }

    @Watch('status')
    async handleChangeStatus () {
        this.searchParams.statusIds = this.status;
        
        await this.fetchData();
        if (this.searchParams.limit * this.searchParams.page <= this.totalItems) {
            this.numPostsInPage = this.searchParams.limit * this.searchParams.page;
        } else {
            this.numPostsInPage = this.totalItems;
        }
    }
}