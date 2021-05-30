import Vue from "vue";
import Component from "vue-class-component";

@Component({
    template: require("./template.html").default,
})
export default class ListDataComponent extends Vue {
    totalItems: number = 100;
    totalPages: number = 15;
    currentPage: number = 1;
    limitPerPage: number[] = [5, 10, 15, 20];
    pageSize: number = 5;
    numPostsInPage: number = 20;

    get TotalPageVisible() {
        if (this.totalPages < 7)
            return this.totalPages
        else
            return 7
    }

    data: any = [
        {
            province: "Cần Thơ",
            minTemp: "30",
            maxTemp: "35",
            status: "Nắng nóng",
        },
        {
            province: "Long An",
            minTemp: "30",
            maxTemp: "35",
            status: "Nắng nóng",
        },
        {
            province: "Tiền Giang",
            minTemp: "30",
            maxTemp: "35",
            status: "Nắng nóng",
        },
        {
            province: "Bến Tre",
            minTemp: "30",
            maxTemp: "35",
            status: "Nắng nóng",
        },
        {
            province: "Vĩnh Long",
            minTemp: "30",
            maxTemp: "35",
            status: "Nắng nóng",
        },
    ];
}
