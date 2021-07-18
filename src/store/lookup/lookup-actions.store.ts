
import { ApiResponse } from '@/model/app-config';
import { LookupServices } from '@/service/lookup-service/lookup.service';
import { ActionTree } from 'vuex';
import { ILookupState } from './lookup-states.store';
import lookupTypesStore from './lookup-types.store';
const service = new LookupServices();

const actions = <ActionTree<ILookupState, any>>{

    [lookupTypesStore.Get.LOOKUP_DATA]: ({ getters, commit, dispatch, state }, type: string) => {
        if (getters.getLookupData[type]) {
            return getters.getLookupData[type];
        }
        return service[type]().then((response: ApiResponse) => {
            commit(lookupTypesStore.Set.STORED_LOOKUP_OBJECT, { key: type, data: response });
        }).catch(err => {
            console.log(err);
        })
    },

    [lookupTypesStore.Get.GENERAL]: ({ getters, commit, dispatch, state }, payload: number[]) => {
        let needToCall = [];
        let existed = {};

        payload.forEach(type => {
            if (getters.getLookupData[type]) {
                existed[type] = getters.getLookupData[type];
            } else {
                needToCall.push(type);
            }
        })

        // all is ready
        if (needToCall.length === 0) {
            return existed;
        }

        return service[lookupTypesStore.Get.GENERAL](needToCall).then((response: ApiResponse) => {
            if (response) {
                Object.keys(response).forEach(type => {
                    commit(lookupTypesStore.Set.STORED_LOOKUP_OBJECT, { key: type, data: response[type] });
                })
            }
        }).catch(err => {
            console.log(err);
        })
    },
};

export default actions;
