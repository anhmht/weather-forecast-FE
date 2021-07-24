import { IUserState } from './user-states.store';
import { GetterTree } from 'vuex';
import userTypesStore from './user-types.store';

const getters: GetterTree<IUserState, {}> = <GetterTree<IUserState, {}>>{
    [userTypesStore.Get.Auth]: (state: IUserState) => {
        return state.auth;
    },
};

export default getters;
