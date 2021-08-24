
import ReactionMixin from "@/mixins/reaction";
import { storeModules } from "@/store";
import lookupTypesStore, { GeneralLookupTypes } from "@/store/lookup/lookup-types.store";
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";
import { Getter, namespace } from "vuex-class";

const LookupGetter = namespace(storeModules.Lookup, Getter);

@Component({
    template: require("./template.html").default,
    mixins: [ReactionMixin]
})
export default class ReactionComponent extends Vue {
    @Prop({ type: Array, default: () => [] })
    actionIcons

    currentChecking: any = null;
        
    @LookupGetter(lookupTypesStore.Get.LOOKUP_DATA) dtoLookupData: Object;

    get lookupReaction() {
        return this.dtoLookupData[GeneralLookupTypes.REACTION] || [];
    }

    handleReaction(reaction) {
        this.$emit('save', reaction);
        const vm = this as any;
        const icon = vm.$getReaction(reaction.valueId);
        this.currentChecking = {
            id: reaction.valueId,
            desc: icon.desc,
            url: icon.url,
            color: icon.color
        }
    }

    handleLike() {
        if (this.currentChecking) {
            this.currentChecking = null;
        } else {
            const vm = this as any;
            const icon = vm.$getReaction(1);
            this.currentChecking = {
                id: 1,
                desc: icon.desc,
                url: icon.url,
                color: icon.color
            }
        }
        this.$emit('like', this.currentChecking);
    }

    mounted() {
        const currentChecking = this.actionIcons.find(x => x.isCurrentUserChecking);
        if (currentChecking) {
            const vm = this as any;
            const icon = vm.$getReaction(currentChecking.iconId);
            this.currentChecking = {
                id: currentChecking.iconId,
                desc: icon.desc,
                url: icon.url,
                color: icon.color
            }
        }
    }

}