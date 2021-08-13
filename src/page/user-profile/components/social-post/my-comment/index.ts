import Component from "vue-class-component";
import Vue from 'vue';
import { DataHelper } from "@/utils/data-helper";

@Component({
    template: require('./template.html').default
})
export default class MyCommentComponent extends Vue {

    getColor(name) {
        return DataHelper.generateColorByString(name);
    }
}