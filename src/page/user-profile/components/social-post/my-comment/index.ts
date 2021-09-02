import Component from "vue-class-component";
import Vue from "vue";
import { DataHelper } from "@/utils/data-helper";
import { SocialServices } from "@/service/social-service/social.service";

@Component({
    template: require("./template.html").default
})
export default class MyCommentComponent extends Vue {
    myComments: any = [];
    isLoading: boolean = false;
    totalPages: number = 0;
    searchParam = {
        limit: 2,
        page: 1
    };
    attrs: any = {
        class: "mb-6",
        boilerplate: true,
        elevation: 2
    };
    socialService: SocialServices = new SocialServices();

    getColor(name) {
        return DataHelper.generateColorByString(name);
    }

    loadMorePost() {
        window.addEventListener('scroll', () => {
            const {
                scrollTop,
                scrollHeight,
                clientHeight
            } = document.documentElement;

            if (scrollTop + clientHeight >= scrollHeight - 5 && !this.isLoading) {
                if (this.searchParam.page < this.totalPages) {
                    this.searchParam.page += 1;
                    this.fetchData();
                }
            }
        }, { passive: true });
    }

    fetchData() {
        this.isLoading = true;
        this.socialService
            .getListCommentsUser(this.searchParam.limit, this.searchParam.page)
            .then((res: any) => {
                this.myComments = this.myComments.concat(res.items);
                this.totalPages = res.totalPages;
                this.isLoading = false;
            })
            .catch(error => {
                this.$errorMessage(error);
                this.isLoading = false;
            });
    }

    mounted() {
        this.fetchData();
        this.loadMorePost();
    }
}
