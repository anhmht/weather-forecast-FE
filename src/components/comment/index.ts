
import { DataHelper } from "@/utils/data-helper";
import Vue from "vue";
import Component from "vue-class-component";

@Component({
    template: require("./template.html").default,
    components: {
        "emoji-picker": () => import("../../components/emoji-picker/EmojiPickerComponent.vue")
    }
})
export default class CommentComponent extends Vue {
    newComment: string = '';

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
}