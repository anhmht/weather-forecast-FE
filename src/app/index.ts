import Vue from 'vue';
import Component from 'vue-class-component';

@Component({
  template: require('./template.html').default,
  components: {
    "hell": () => import('../components')
  }
})
export default class App extends Vue {

}