
import { ApiResponse } from '@/model/app-config';
import { LookupServices } from '@/service/lookup-service/lookup.service';
import { ActionTree } from 'vuex';
import { ILookupState } from './lookup-states.store';
import lookupTypesStore from './lookup-types.store';
const service = new LookupServices();

const actions = <ActionTree<ILookupState, any>>{

    [lookupTypesStore.Get.LOOKUP_DATA]: ({ getters, commit }, type: string) => {
        if (getters.getLookupData[type]) {
            return getters.getLookupData[type];
        }
        return service[type]().then((response: ApiResponse) => {
            commit(lookupTypesStore.Set.STORED_LOOKUP_OBJECT, { key: type, data: response });
        }).catch(err => {
            console.log(err);
        })
    },

};

export default actions;
