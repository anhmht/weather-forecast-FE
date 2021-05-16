import Vue from "vue";
import Component from "vue-class-component";
import relative from '../../../static/img/info-detail-page/section_2_relative.jpg';

@Component({
    template: require("./template.html").default,
    components: {
        "base-container": () => import("../../components/base-container/BaseContainerComponent.vue"),
    }
})
export default class InfoDetailPageComponent extends Vue {
    relativePosts: any = [
        {
            imageUrl: relative,
            title: 'Tin tức thời tiết hôm nay 14.5.2021: Nắng nóng kéo dài đến ngày 17.5',
            id: 1
        },
        {
            imageUrl: relative,
            title: 'Tin tức thời tiết hôm nay 14.5.2021: Nắng nóng kéo dài đến ngày 17.5',
            id: 2
        },
        {
            imageUrl: relative,
            title: 'Tin tức thời tiết hôm nay 14.5.2021: Nắng nóng kéo dài đến ngày 17.5',
            id: 3
        }
    ];
}
