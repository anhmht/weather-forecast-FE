import Vue from "vue";
import App from "./app/App.vue";
import Component from "vue-class-component";
import router from "./router";
import vuetify from "./plugins/Vuetify";
import axios from 'axios';
import { getLocalStorage, setAxiosHeader } from "./utils/appConfig";

Vue.config.productionTip = false;

axios.defaults.baseURL = 'https://weathermanagement.azurewebsites.net/';
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
axios.defaults.headers.post['Access-Control-Allow-Methods'] = 'GET, POST, PATCH, PUT, DELETE, OPTIONS';
axios.defaults.headers.post['Access-Control-Allow-Headers'] = 'Content-Type, Authorization';

@Component({
    template: "<App/>",
    components: {
        App
    },
    created: function() {}
})
class RootApp extends Vue {
    created() {
        const authConfig = getLocalStorage('auth');
        if (authConfig) {
            setAxiosHeader(authConfig.token);
        }
    }
}

new RootApp({
    router,
    vuetify
}).$mount("#app");
