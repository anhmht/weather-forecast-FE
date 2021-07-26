import _Vue from "vue";

const ErrorHandlerPlugin = {
    install(Vue: typeof _Vue) {
        Vue.prototype.$errorMessage = function (error: any) {
            this.$toast.error(error.response.data.error)
        };
    }
}

export default ErrorHandlerPlugin;

declare module 'vue/types/vue' {
    interface Vue {
        $errorMessage: any;
    }
}