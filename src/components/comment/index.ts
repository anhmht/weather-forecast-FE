
import { SocialServices } from "@/service/social-service/social.service";
import { DataHelper } from "@/utils/data-helper";
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";

@Component({
    template: require("./template.html").default,
    components: {
        "emoji-picker": () => import("../../components/emoji-picker/EmojiPickerComponent.vue")
    }
})
export default class CommentComponent extends Vue {
    @Prop({required: true}) postId

    newComment: string = '';
    isLoading: boolean = false;
    totalPages: number = 0;
    service: SocialServices = new SocialServices();
    searchParam = {
        limit: 5,
        page: 1
    }

    commentList: any = [];

    get visibleLoadMore() {
        return this.searchParam.page < this.totalPages
    }

    getColor(name) {
        return DataHelper.generateColorByString(name);
    }

    renderText(comment) {
        return comment.length >= 255 ? comment.slice(0, 255) + '...' : comment
    }

    handleClickOnEmoji (val) {
        const vm = this;
        if (vm.$refs.commentTextarea) {
            let cnt = DataHelper.insertCharacterAtCursorPositionOfTextArea(vm.$refs.commentTextarea, val);
            this.newComment = cnt;
        }
    }

    handleLoadMoreComment() {
        if (this.searchParam.page < this.totalPages) {
            this.searchParam.page += 1;
            this.fetchData();
        }
    }

    fetchData() {
        this.isLoading = true;
        this.service.getListCommentsByPost(this.searchParam.limit, this.searchParam.page, this.postId)
            .then((res: any) => {
                this.commentList = this.commentList.concat(res.comments);
                this.totalPages = res.totalPages;
                this.isLoading = false;
            }).catch(err => {
                this.isLoading = false;
            })
    }

    mounted() {
        this.fetchData();
    }
}