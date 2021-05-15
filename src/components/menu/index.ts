import { PATH } from "@/constant/route-constant";
import Vue from "vue";
import Component from "vue-class-component";

@Component({
    template: require("./template.html").default
})
export default class MenuComponent extends Vue {
    isActive: Number = 0;
    get menuItems() {
        return [
            {
                name: "Giới Thiệu",
                path: PATH.INFO
            },
            {
                name: "Dữ Liệu KTTV",
                path: PATH.DATA
            },
            {
                name: "Thời Gian",
                path: PATH.TIME
            },
            {
                name: "Biểu Tượng Thời Tiết",
                path: PATH.ICON
            },
            {
                name: "Bản Đồ",
                path: PATH.RADAR
            },
            {
                name: "Cộng Đồng",
                path: PATH.SOCIAL
            },
            {
                name: "Đăng Nhập",
                path: PATH.LOGIN
            }
        ];
    }

    handleClick(index) {
        this.isActive = index;
        const type = this.menuItems[index];
        if (this.$route.path !== type.path) this.$router.push(type.path)
    }

    setActiveMenu() {
        const index = this.menuItems.findIndex(x => this.$route.path.includes(x.path));
        this.isActive = index;
    }

    mounted() {
        this.setActiveMenu();
    }
}
