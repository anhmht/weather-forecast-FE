import { Component } from "vue-property-decorator";
import Vue from "vue";
import { Getter, namespace } from "vuex-class";
import { storeModules } from "@/store";
import lookupTypesStore, { GeneralLookupTypes } from "@/store/lookup/lookup-types.store";


const LookupGetter = namespace(storeModules.Lookup, Getter);

@Component
export default class ReactionMixin extends Vue {

    @LookupGetter(lookupTypesStore.Get.LOOKUP_DATA) dtoLookupData: Object;

    get lookupReaction() {
        return this.dtoLookupData[GeneralLookupTypes.REACTION] || [];
    }

    data: any = [
        {
            id: 1,
            url: "https://weatherstoragevn.blob.core.windows.net/static-photo/emoji/like.png",
            color: '#006FFF'
        },
        {
            id: 2,
            url: "https://weatherstoragevn.blob.core.windows.net/static-photo/emoji/heart.png",
            color: '#F35369'
        },
        {
            id: 3,
            url: "https://weatherstoragevn.blob.core.windows.net/static-photo/emoji/smile.png",
            color: '#F5C33B'
        },
        {
            id: 4,
            url: "https://weatherstoragevn.blob.core.windows.net/static-photo/emoji/haha.png",
            color: '#F5C33B'
        },
        {
            id: 5,
            url: "https://weatherstoragevn.blob.core.windows.net/static-photo/emoji/wow.png",
            color: '#F5C33B'
        },
        {
            id: 6,
            url: "https://weatherstoragevn.blob.core.windows.net/static-photo/emoji/sad.png",
            color: '#F5C33B'
        },
        {
            id: 7,
            url: "https://weatherstoragevn.blob.core.windows.net/static-photo/emoji/angry.png",
            color: '#FB724B'
        },
        {
            id: 8,
            url: "https://weatherstoragevn.blob.core.windows.net/static-photo/emoji/dislike.png",
            color: '#FB724B'
        },
    ]

    $getReaction(id) {
        const reaction = this.lookupReaction.find(x => x.valueId === id);
        const icon = this.data.find(x => x.id === reaction.valueId);
        return {
            valueId: reaction.valueId,
            desc: reaction.description,
            url: icon.url,
            color: icon.color
        }
    }
}