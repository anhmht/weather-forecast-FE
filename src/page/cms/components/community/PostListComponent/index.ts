import BaseApprovalListComponent from "../BaseApprovaListComponent/base-approval-list";
import Component from "vue-class-component";

@Component({
    template: require("./template.html").default,
})
export default class SocialPostListComponent extends BaseApprovalListComponent {

    async fetchData () {
        await this.getPostForApproval();

        if (this.searchParams.limit <= this.totalItems) {
            this.numPostsInPage = this.searchParams.limit;
        } else {
            this.numPostsInPage = this.totalItems;
        }
        this.$forceUpdate();
    }

    async getPostForApproval () {
        await this.socialService.getPostForApproval(this.searchParams).then((res: any) => {
            this.dtSource = res.items;

            this.totalItems = res.totalItems;
            this.totalPages = res.totalPages;
        }).catch(err => {
            console.log(err);
        })
    }

    async mounted() {
        this.searchParams.statusIds = [0, 1, 2, 3, 4];
        await this.getPostForApproval();

        if (this.searchParams.limit <= this.totalItems) {
            this.numPostsInPage = this.searchParams.limit;
        } else {
            this.numPostsInPage = this.totalItems;
        }
    }
}