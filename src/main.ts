import Vue from 'vue';
import App from './app/App.vue';
import Component from "vue-class-component";

Vue.config.productionTip = false

@Component({
	template: "<App/>",
	components: {
		App
	},
	created: function () {
	},
})
class RootApp extends Vue {

}

new RootApp().$mount('#app')
