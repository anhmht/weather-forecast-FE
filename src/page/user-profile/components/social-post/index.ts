import Vue from 'vue';
import Component from 'vue-class-component';


@Component({
    template: require("./template.html").default,
    components: {
        "my-post": () => import("./my-post/MyPostComponent.vue"),
        "my-comment": () => import("./my-comment/MyCommentComponent.vue")
    }
})
export default class SocialPostComponent extends Vue {

    activeTab: string = 'my-post';

    handleChangeTab(name) {
        this.activeTab = name;
    }

}
