import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
    template: require("./template.html").default,
})
export default class CreatePostComponent extends Vue {
    @Prop({required: true})
    isLoading

    @Prop({type: Boolean, default: true})
    absolute
}
