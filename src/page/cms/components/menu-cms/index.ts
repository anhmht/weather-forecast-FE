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
            query: { categoryId: 'e78c78b7-80d1-4f3b-3014-08d91e5e4dfa' }
        },
        {
            title: 'Thông tin khuyến cáo',
            icon: 'mdi-home-account',
            path: PATH.LIST_POST,
            query: { categoryId: '580ffb36-2c72-4642-cb46-08d91fa2c701' }
        },
        {
            title: 'Dữ liệu KTTV',
            icon: 'mdi-home-account',
            path: PATH.LIST_DATA,
        },
        {
            title: 'Biểu tượng thời tiết',
            icon: 'mdi-home-account',
            path: PATH.LIST_ICON,
        },
        {
            title: 'Cộng đồng',
            icon: 'mdi-home-account',
            path: PATH.LIST_POST,
        },
    ]

    handleClick(index) {
        this.activeMenu = index;
        const type = this.menuList[index];
        if (this.$route.path !== type.path) {
            this.$router.push({
                path: type.path,
                query: type.query || null
            })
        }
    }
}
