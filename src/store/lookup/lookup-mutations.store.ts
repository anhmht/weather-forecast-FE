import { MutationTree } from "vuex";
import { ILookupState } from "./lookup-states.store";
import lookupTypesStore from "./lookup-types.store";
import Vue from "vue";

const mutations: MutationTree<ILookupState> = <MutationTree<ILookupState>>{
    /**
     * MUTATION: STORE LOOKUP BY KEY
     */
    [lookupTypesStore.Set.STORED_LOOKUP_OBJECT]: (state, request: { key: string; data: any }) => {
        Vue.set(state.storedlookupObject, request.key, request.data)
    },
};

export default mutations;
