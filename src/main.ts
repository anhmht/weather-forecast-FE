import { BASE_URL } from './constant/common-constant';
import Vue from "vue";
import App from "./app/App.vue";
import Component from "vue-class-component";
import router from "./router";
import vuetify from "./plugins/Vuetify";
import axios from 'axios';
import { getLocalStorage, setAxiosHeader } from "./utils/appConfig";
import Loading from './components/loading';
import { DateFormatterPlugin } from './plugins/date-format';
import store from "./store";
import { StringFormatterPlugin } from './plugins/string-format';
import SignalRPlugin from './plugins/signalr';
import VueToast from 'vue-toast-notification';
import 'animate.css/animate.min.css';
import 'vue-toast-notification/dist/theme-sugar.css';
import '../static/js/leaflet.edgebuffer.js';

Vue.config.productionTip = false;

axios.defaults.baseURL = BASE_URL;
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
axios.defaults.headers.post['Access-Control-Allow-Methods'] = 'GET, POST, PATCH, PUT, DELETE, OPTIONS';
axios.defaults.headers.post['Access-Control-Allow-Headers'] = 'Content-Type, Authorization';

Vue.component('loading', Loading);
Vue.use(DateFormatterPlugin);
Vue.use(StringFormatterPlugin);
Vue.use(VueToast, {
    position: 'top-right'
});

Vue.use(SignalRPlugin, {
    url: 'https://weathermanagement.azurewebsites.net/notifications'
});
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
