import _Vue from "vue";
import moment from "moment";

export const DateFormatterPlugin = {
    install(Vue: typeof _Vue) {
        Vue.prototype.$formatDateTime = function (value: string) {
            let date = moment(value + 'Z');
            if (!date.isValid()) return value;
            return date.format('DD/MM/YYYY HH:mm:ss');
        };

        Vue.prototype.$formatDate = function (value: string) {
            let date = moment(value);
            if (!date.isValid()) return value;
            return date.format('DD/MM/YYYY');
        };
    }
}
