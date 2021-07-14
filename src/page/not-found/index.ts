import Vue from "vue";
import Component from "vue-class-component";

@Component({
    template: require("./template.html").default
})
export default class PageNotFoundComponent extends Vue {
    imageUrl: string = 'https://weatherstoragevn.blob.core.windows.net/static-photo/page/not-found.png'
}
