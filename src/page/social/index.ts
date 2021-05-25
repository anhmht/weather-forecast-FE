import Vue from "vue";
import Component from "vue-class-component";
import image from "../../../static/img/social-page/item.jpg"

@Component({
    template: require("./template.html").default,
    components: {
        "base-container": () => import("../../components/base-container/BaseContainerComponent.vue")
    }
})
export default class SocialPageComponent extends Vue {
    mainPosts: any = [
        {
            imageUrl: image,
            title: "Chiều tối và đêm 13/5, các khu vực đều mưa dông, đề phòng thời tiết nguy hiểm",
            date: "16.05.2021"
        },
        {
            imageUrl: image,
            title: "Chiều tối và đêm 13/5, các khu vực đều mưa dông, đề phòng thời tiết nguy hiểm",
            date: "16.05.2021"
        }
    ];

    subPostsFirstRow: any = [
        {
            imageUrl: image,
            title: "Chiều tối và đêm 13/5, các khu vực đều mưa dông, đề phòng thời tiết nguy hiểm",
        },
        {
            imageUrl: image,
            title: "Chiều tối và đêm 13/5, các khu vực đều mưa dông, đề phòng thời tiết nguy hiểm",
        },
        {
            imageUrl: image,
            title: "Chiều tối và đêm 13/5, các khu vực đều mưa dông, đề phòng thời tiết nguy hiểm",
        },
        {
            imageUrl: image,
            title: "Chiều tối và đêm 13/5, các khu vực đều mưa dông, đề phòng thời tiết nguy hiểm",
        },
        {
            imageUrl: image,
            title: "Chiều tối và đêm 13/5, các khu vực đều mưa dông, đề phòng thời tiết nguy hiểm",
        },
        {
            imageUrl: image,
            title: "Chiều tối và đêm 13/5, các khu vực đều mưa dông, đề phòng thời tiết nguy hiểm",
        },
        {
            imageUrl: image,
            title: "Chiều tối và đêm 13/5, các khu vực đều mưa dông, đề phòng thời tiết nguy hiểm",
        },
        {
            imageUrl: image,
            title: "Chiều tối và đêm 13/5, các khu vực đều mưa dông, đề phòng thời tiết nguy hiểm",
        }
    ];


}
