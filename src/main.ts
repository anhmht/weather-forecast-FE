import Vue from "vue";
import App from "./app/App.vue";
import Component from "vue-class-component";
import router from "./router";
import vuetify from "./plugins/Vuetify";

Vue.config.productionTip = false;

@Component({
    template: "<App/>",
    components: {
        App
    },
    created: function() {}
})
class RootApp extends Vue {}

new RootApp({
    router,
    vuetify
}).$mount("#app");
