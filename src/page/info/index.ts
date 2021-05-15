import Vue from "vue";
import Component from "vue-class-component";
import polute from '../../../static/img/info-page/polute1.jpg';
import { Carousel, Slide } from 'vue-carousel';

@Component({
    template: require("./template.html").default,
    components: {
        "base-container": () => import("../../components/base-container/BaseContainerComponent.vue"),
        Carousel,
        Slide
    }
})
export default class InfoPageComponent extends Vue {
    navigateTo: number = 0;
    posts: any = [
        {
            imageUrl: polute,
            title: 'Ô nhiễm không khí tại một số đô thị lớn có xu hướng gia tăng',
            id: 1
        },
        {
            imageUrl: polute,
            title: 'Ô nhiễm không khí tại một số đô thị lớn có xu hướng gia tăng',
            id: 2
        },
        {
            imageUrl: polute,
            title: 'Ô nhiễm không khí tại một số đô thị lớn có xu hướng gia tăng',
            id: 3
        },
        {
            imageUrl: polute,
            title: 'Ô nhiễm không khí tại một số đô thị lớn có xu hướng gia tăng',
            id: 4
        },
        {
            imageUrl: polute,
            title: 'Ô nhiễm không khí tại một số đô thị lớn có xu hướng gia tăng',
            id: 5
        },
        {
            imageUrl: polute,
            title: 'Ô nhiễm không khí tại một số đô thị lớn có xu hướng gia tăng',
            id: 6
        },
        {
            imageUrl: polute,
            title: 'Ô nhiễm không khí tại một số đô thị lớn có xu hướng gia tăng',
            id: 7
        },
        {
            imageUrl: polute,
            title: 'Ô nhiễm không khí tại một số đô thị lớn có xu hướng gia tăng',
            id: 8
        },
    ];

    handlePrev() {
        if(this.navigateTo) {
            this.navigateTo -= 1
        }
    }
    handleNext() {
        const totalPage = Math.ceil(this.posts.length / 4);
        console.log(totalPage);

        if (this.navigateTo < totalPage) {
            this.navigateTo += 1
        }
    }

    handleViewDetail(postId) {
        this.$router.push('/info/' + postId)
    }
}
