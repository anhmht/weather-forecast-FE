import Vue from "vue";
import Component from "vue-class-component";
import image from "../../../../../static/img/info-detail-page/section_2_main.jpg"
import { PATH } from "../../../../constant/route-constant";

@Component({
    template: require("./template.html").default,
})
export default class ListPostComponent extends Vue {
    posts = [
        {
            image: image,
            title: 'Không khí lạnh gây mưa rét ở miền Bắc từ đêm nay',
            postedDate: '22/5/2021',
            category: 'Thời tiết',
            status: 'Public'
        },
        {
            image: image,
            title: 'Không khí lạnh gây mưa rét ở miền Bắc từ đêm nay',
            postedDate: '22/5/2021',
            category: 'Thời tiết',
            status: 'Public'
        },
        {
            image: image,
            title: 'Không khí lạnh gây mưa rét ở miền Bắc từ đêm nay',
            postedDate: '22/5/2021',
            category: 'Thời tiết',
            status: 'Public'
        },
        {
            image: image,
            title: 'Không khí lạnh gây mưa rét ở miền Bắc từ đêm nay',
            postedDate: '22/5/2021',
            category: 'Thời tiết',
            status: 'Public'
        },
        {
            image: image,
            title: 'Không khí lạnh gây mưa rét ở miền Bắc từ đêm nay',
            postedDate: '22/5/2021',
            category: 'Thời tiết',
            status: 'Public'
        }
    ]

    toCreatePost() {
        this.$router.push(PATH.CREATE_POST)
    }
}
