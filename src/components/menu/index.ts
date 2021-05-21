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
                name: "GIỚI THIỆU",
                path: PATH.INFO
            },
            {
                name: "DỮ LIỆU KTTV",
                path: PATH.DATA
            },
            {
                name: "THỜI GIAN",
                path: PATH.TIME
            },
            {
                name: "BIỂU TƯỢNG THỜI TIẾT",
                path: PATH.ICON
            },
            {
                name: "BẢN ĐỒ",
                path: PATH.RADAR
            },
            {
                name: "CỘNG ĐỒNG",
                path: PATH.SOCIAL
            },
            {
                name: "ĐĂNG NHẬP",
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
