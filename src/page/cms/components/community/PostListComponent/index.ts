import BaseApprovalListComponent from "../BaseApprovaListComponent/base-approval-list";
import Component from "vue-class-component";
import { Watch } from "vue-property-decorator";

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

    handleViewPost (Id: string) {
        let obj = this.coList.find(e => e.id === Id);
        if (obj) {
            this.socialService.getPostDetailForApproval(obj.id).then(res => {
                this.currentItem = {...res};
                this.reveal = false;
                this.viewDetailDialog = true;
            }).catch(err => {
                this.currentItem = null;
                this.viewDetailDialog = false;
                console.log(err);
            })
        }
    }

    handleApprove (id: string) {
        this.socialService.approvePost(id).then(res => {
            this.fetchData();
        }).catch(err => {
            console.log(err);
        })
    }

    handleBlock (id: string) {
        let blockStatus = this.lookupPostStatus.find(e => e.valueText === 'Blocked');
        if (blockStatus) {
            this.handleUpdateStatus(id, blockStatus.valueId)
        }
    }

    handleUpdateStatus (id: string, statusId: string) {
        this.socialService.changePostStatus(id, statusId).then(res => {
            this.fetchData();
        }).catch(err => {
            console.log(err);
        })
    }

    async mounted() {
        this.searchParams.statusIds = this.status;
        await this.getPostForApproval();

        if (this.searchParams.limit <= this.totalItems) {
            this.numPostsInPage = this.searchParams.limit;
        } else {
            this.numPostsInPage = this.totalItems;
        }
    }

    @Watch('status')
    async handleChangeStatus () {
        this.searchParams.page = 1;
        this.searchParams.statusIds = this.status;
        
        await this.fetchData();
        if (this.searchParams.limit * this.searchParams.page <= this.totalItems) {
            this.numPostsInPage = this.searchParams.limit * this.searchParams.page;
        } else {
            this.numPostsInPage = this.totalItems;
        }
    }
}