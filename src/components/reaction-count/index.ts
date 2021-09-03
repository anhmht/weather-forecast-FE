import Vue from "vue";
import Component from "vue-class-component";
import ReactionMixin from "@/mixins/reaction";
import { Prop } from "vue-property-decorator";
import _ from "lodash";

@Component({
    template: require("./template.html").default,
    mixins: [ReactionMixin],
})
export default class ReactionCountComponent extends Vue {
    @Prop({ type: Array, default: () => [] })
    actionIcons

    get reactionCount() {
        const sum = this.actionIcons.reduce((prev, value) => {
            return prev += value.count;
        }, 0);
        return this.actionIcons.length ? sum : null
    }

    get reactions() {
        return _.uniqBy(this.actionIcons, 'iconId');
    }
}