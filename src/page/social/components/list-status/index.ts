
import { DataHelper } from '@/utils/data-helper';
import Vue from 'vue';
import Component from 'vue-class-component';

@Component({
    template: require("./template.html").default,
})
export default class ListStatusComponent extends Vue {


    getColor(name) {
        return DataHelper.generateColorByString(name);
    }
}