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

        Vue.prototype.$displayContent = function (value: string) {
            if (value.length >= 255) {
                return `${value.substring(0, 254)}...`;
            }

            return value;
        };
    }
}
