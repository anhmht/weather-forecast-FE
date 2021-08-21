
import { DataHelper } from "@/utils/data-helper";
import Vue from "vue";
import Component from "vue-class-component";

@Component({
    template: require("./template.html").default,
})
export default class CommentComponent extends Vue {

    getColor(name) {
        return DataHelper.generateColorByString(name);
    }

    renderText(comment) {
        return comment.length >= 255 ? comment.slice(0, 255) + '...' : comment
    }
}