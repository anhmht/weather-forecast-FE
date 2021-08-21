import Component from "vue-class-component";
import Vue from "vue";
import { DataHelper } from "@/utils/data-helper";
import { SocialServices } from "@/service/social-service/social.service";

@Component({
    template: require("./template.html").default
})
export default class MyCommentComponent extends Vue {
    GET_LIST_COMMENTS_USER_LIMIT: number = 10;
    GET_LIST_COMMENTS_USER_PAGE: number = 1;
    myComments: any = [];
    socialService: SocialServices = new SocialServices();

    getColor(name) {
        return DataHelper.generateColorByString(name);
    }

    mounted() {
        this.socialService
            .getListCommentsUser(
                this.GET_LIST_COMMENTS_USER_LIMIT,
                this.GET_LIST_COMMENTS_USER_PAGE
            )
            .then((res: any) => {
                this.myComments = res.items;
                console.log(this.myComments);
            })
            .catch(error => {
                this.$errorMessage(error);
            });
    }
}
