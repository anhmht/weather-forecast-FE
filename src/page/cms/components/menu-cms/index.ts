import { PATH } from "@/constant/route-constant";
import Vue from "vue";
import Component from "vue-class-component";


@Component({
    template: require("./template.html").default,
    components: {
    }
})
export default class MenuCMSComponent extends Vue {
    activeMenu: number = 0;
    menuList= [
        {
            title: 'Cảnh báo thiên tai',
            icon: 'mdi-home-account',
            path: PATH.LIST_POST,
        },
        {
            title: 'Thông tin khuyến cáo',
            icon: 'mdi-home-account',
            path: PATH.LIST_POST,
        },
        {
            title: 'Dữ liệu KTTV',
            icon: 'mdi-home-account',
            path: PATH.LIST_POST,
        },
        {
            title: 'Biểu tượng thời tiết',
            icon: 'mdi-home-account',
            path: PATH.LIST_POST,
        },
        {
            title: 'Cộng đồng',
            icon: 'mdi-home-account',
            path: PATH.LIST_POST,
        },
    ]

    handleClick(index) {
        this.activeMenu = index;
    }
}
