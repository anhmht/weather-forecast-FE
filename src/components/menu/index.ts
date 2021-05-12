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
                path: "/info"
            },
            {
                name: "Dữ Liệu KTTV",
                path: "/data"
            },
            {
                name: "Thời Gian",
                path: "/time"
            },
            {
                name: "Biểu Tượng Thời Tiết",
                path: "/icon"
            },
            {
                name: "Bản Đồ",
                path: "/radar"
            },
            {
                name: "Cộng Đồng",
                path: "/social"
            }
        ];
    }

    handleClick(index) {
        this.isActive = index;
        const type = this.menuItems[index];
        this.$router.push(type.path);
    }
}
