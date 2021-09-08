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
            color: '#006FFF',
            name: 'Like'

        },
        {
            id: 2,
            url: "https://weatherstoragevn.blob.core.windows.net/static-photo/emoji/heart.png",
            color: '#F35369',
            name: 'Heart'
        },
        {
            id: 3,
            url: "https://weatherstoragevn.blob.core.windows.net/static-photo/emoji/smile.png",
            color: '#F5C33B',
            name: 'Smile'
        },
        {
            id: 4,
            url: "https://weatherstoragevn.blob.core.windows.net/static-photo/emoji/haha.png",
            color: '#F5C33B',
            name: 'Laugh'
        },
        {
            id: 5,
            url: "https://weatherstoragevn.blob.core.windows.net/static-photo/emoji/wow.png",
            color: '#F5C33B',
            name: 'Wow'
        },
        {
            id: 6,
            url: "https://weatherstoragevn.blob.core.windows.net/static-photo/emoji/sad.png",
            color: '#F5C33B',
            name: 'Sad'
        },
        {
            id: 7,
            url: "https://weatherstoragevn.blob.core.windows.net/static-photo/emoji/angry.png",
            color: '#FB724B',
            name: 'Angry'
        },
        {
            id: 8,
            url: "https://weatherstoragevn.blob.core.windows.net/static-photo/emoji/dislike.png",
            color: '#FB724B',
            name: 'DisLike'
        },
        {
            id: 9,
            url: "https://weatherstoragevn.blob.core.windows.net/static-photo/emoji/comment.png",
            color: '#006FFF',
            name: 'Comment'
        },
        {
            id: 10,
            url: "https://weatherstoragevn.blob.core.windows.net/static-photo/emoji/share.png",
            color: '#006FFF',
            name: 'Share'
        },
        {
            id: 11,
            url: "https://weatherstoragevn.blob.core.windows.net/static-photo/emoji/post.png",
            color: '#006FFF',
            name: 'Post'
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

    $getReactionByName(name) {
        const icon = this.data.find(x => x.name === name);
        const reaction = this.lookupReaction.find(x => x.valueId === icon.id);
        return {
            valueId: reaction ? reaction.valueId : null,
            desc: reaction ? reaction.description : null,
            url: icon.url,
            color: icon.color
        }
    }
}