import Component from "vue-class-component";
import Vue from 'vue';

@Component({
    template: require('./template.html').default
})
export default class MyPostComponent extends Vue {

    getStatus(statusId) {
        switch (statusId) {
            case 0:
                return 'Chờ duyệt';
            case 1:
                return 'Đã duyệt';
            case 2:
                return 'Không duyệt';
            default:
                return '';
        }
    }
}