

import Vue from "vue";
import Component from "vue-class-component";

@Component({
    template: require("./template.html").default,
})
export default class SocialMenuComponent extends Vue {
    active: number = 0;

    menus: any = [
        {
            name: 'Trang chủ',
            icon: 'mdi-home'
        },
        {
            name: 'Thông tin thời tiết',
            icon: 'mdi-weather-lightning-rainy'
        },
        {
            name: 'Tin thiên tai',
            icon: 'mdi-lightning-bolt'
        },
        {
            name: 'Tin khác',
            icon: 'mdi-file-document-outline'
        }
    ]
}
