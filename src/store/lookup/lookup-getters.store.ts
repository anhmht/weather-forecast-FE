import { ILookupState } from './lookup-states.store';
import { GetterTree } from 'vuex';
import lookupTypesStore from './lookup-types.store';

const getters: GetterTree<ILookupState, {}> = <GetterTree<ILookupState, {}>>{
    [lookupTypesStore.Get.STATUS]: (state: ILookupState) => {
        return state.storedlookupObject[lookupTypesStore.Get.STATUS];
    },
    [lookupTypesStore.Get.LOOKUP_DATA]: (state: ILookupState) => {
        return state.storedlookupObject;
    },
};

export default getters;
