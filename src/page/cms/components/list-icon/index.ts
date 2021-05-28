import Vue from "vue";
import Component from "vue-class-component";
import icon from "../../../../../static/img/icon/angry_clouds.png";

@Component({
    template: require("./template.html").default,
})
export default class ListIconComponent extends Vue {
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

    icons: any = [
        {
            imageUrl: icon,
            name: "Quang mây, không mưa",
            type: "Quang mây"
        },
        {
            imageUrl: icon,
            name: "Quang mây, không mưa",
            type: "Quang mây"
        },
        {
            imageUrl: icon,
            name: "Quang mây, không mưa",
            type: "Quang mây"
        },
        {
            imageUrl: icon,
            name: "Quang mây, không mưa",
            type: "Quang mây"
        },
        {
            imageUrl: icon,
            name: "Quang mây, không mưa",
            type: "Quang mây"
        }
    ];
}
