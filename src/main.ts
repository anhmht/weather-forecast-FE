import { BASE_URL } from './constant/common-constant';
import Vue from "vue";
import App from "./app/App.vue";
import Component from "vue-class-component";
import router from "./router";
import vuetify from "./plugins/Vuetify";
import axios from 'axios';
import { getLocalStorage, setAxiosHeader } from "./utils/appConfig";
import Loading from './components/loading';
import store from "./store";

Vue.config.productionTip = false;

axios.defaults.baseURL = BASE_URL;
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
axios.defaults.headers.post['Access-Control-Allow-Methods'] = 'GET, POST, PATCH, PUT, DELETE, OPTIONS';
axios.defaults.headers.post['Access-Control-Allow-Headers'] = 'Content-Type, Authorization';

Vue.component('loading', Loading);
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
    vuetify,
    store
}).$mount("#app");
