import { ActionTree } from 'vuex';
import { IUserState } from './user-states.store';
import userTypesStore from './user-types.store';


const actions = <ActionTree<IUserState, any>>{
    [userTypesStore.Set.Auth]: ({ getters, commit, dispatch, state }, auth: Object) => {
        commit(userTypesStore.Set.Auth, auth);
    },
};

export default actions;
