import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";

@Component({
    template: require("./template.html").default,
    components: {
        "comment": () => import("../comment/CommentComponent.vue")
    }
})
export default class SubCommentComponent extends Vue {
    @Prop({ required: true }) commentId;
    @Prop({ type: String, default: null }) postId;
    
    handlePreview(data) {
        this.$emit('preview', data);
    }
}