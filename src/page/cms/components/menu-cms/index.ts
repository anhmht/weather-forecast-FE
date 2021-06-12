import { PATH, ROUTE_NAME } from "@/constant/route-constant";
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
            name: ROUTE_NAME.LIST_POST,
            query: { categoryId: 'e78c78b7-80d1-4f3b-3014-08d91e5e4dfa' }
        },
        {
            title: 'Thông tin khuyến cáo',
            icon: 'mdi-home-account',
            name: ROUTE_NAME.LIST_POST,
            query: { categoryId: '580ffb36-2c72-4642-cb46-08d91fa2c701' }
        },
        {
            title: 'Chuyên mục KT-VH-XH',
            icon: 'mdi-home-account',
            name: ROUTE_NAME.LIST_POST,
            query: { categoryId: 'eededf06-2e83-458d-9e0e-08d92ce117ec' }
        },
        {
            title: 'Dữ liệu KTTV',
            icon: 'mdi-home-account',
            name: ROUTE_NAME.LIST_DATA,
        },
        {
            title: 'Biểu tượng thời tiết',
            icon: 'mdi-home-account',
            name: ROUTE_NAME.LIST_ICON,
        },
        {
            title: 'Cộng đồng',
            icon: 'mdi-home-account',
            name: PATH.LIST_POST,
        },
    ]

    handleClick(index) {
        this.activeMenu = index;
        const type = this.menuList[index];
        this.$router.push({
            name: type.name,
            query: type.query || null
        })
    }

    mounted() {
        const index = this.menuList.findIndex(x => x.name === this.$route.name);
        if (this.menuList[index].query) {
            this.activeMenu = this.menuList.findIndex(x => x.query.categoryId === this.$route.query.categoryId);
        } else {
            this.activeMenu = index
        }
    }
}
