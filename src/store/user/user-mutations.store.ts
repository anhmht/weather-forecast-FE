import { MutationTree } from "vuex";
import { IUserState } from "./user-states.store";
import userTypesStore from "./user-types.store";
// import Vue from "vue";

const mutations: MutationTree<IUserState> = <MutationTree<IUserState>>{
    /**
     * MUTATION: STORE LOOKUP BY KEY
     */
    [userTypesStore.Set.Auth]: (state, value: any) => {
        state.auth = value;
    },
};

export default mutations;
