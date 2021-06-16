import { Prop } from 'vue-property-decorator';
import Vue from "vue";
import Component from "vue-class-component";

@Component({
    template: require("./template.html").default
})
export default class ConfirmActionComponent extends Vue {
    @Prop({ required: true })
    value

    @Prop({required: true})
    title

    @Prop({required: true})
    action

    get visibleConfirm() {
        return this.value;
    }

    set visibleConfirm(value) {
        this.$emit('input', value)
    }

    handleSave() {
        this.$emit('confirm', this.action);
    }
}
