import _Vue from "vue";

export const StringFormatterPlugin = {
    install(Vue: typeof _Vue) {
        Vue.prototype.$formatStationType = function (value: string) {
            if (value === 'mua') {
                return "Mưa";
            } else if (value === 'khituong') {
                return "Khí tượng";
            } else if (value === 'thuyvan') {
                return "Thủy văn";
            }

            return value;
        };
    }
}
