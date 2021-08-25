import Vue from "vue";
import Component from "vue-class-component";

@Component({
    template: require("./template.html").default,
    components: {
        'post-list-tab': () => import('./PostListComponent'),
        'comment-list-tab': () => import('./CommentListComponent')
    }
})

export default class CommunityComponent extends Vue {
    tab: any = null;
}
