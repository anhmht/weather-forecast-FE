import { BASE_URL } from '@/constant/common-constant';
import userConstant from '@/constant/uri/user-constant';
import { getLocalStorage, removeLocalStorage, setAxiosHeader, setLocalStorage } from '@/utils/appConfig';
import axios from 'axios';
import { ActionTree } from 'vuex';
import { IUserState } from './user-states.store';
import userTypesStore from './user-types.store';


const actions = <ActionTree<IUserState, any>>{
    [userTypesStore.Set.Auth]: ({ getters, commit, dispatch, state }) => {
        return new Promise((resolve, reject) => {
            const authConfig = getLocalStorage('auth');
            if (authConfig && authConfig.token) {
                axios.defaults.baseURL = BASE_URL;
                axios.defaults.headers.post['Content-Type'] = 'application/json';
                axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
                axios.defaults.headers.post['Access-Control-Allow-Methods'] = 'GET, POST, PATCH, PUT, DELETE, OPTIONS';
                axios.defaults.headers.post['Access-Control-Allow-Headers'] = 'Content-Type, Authorization';
                setAxiosHeader(authConfig.token);
                const url = userConstant.getUserInfo;
                axios.get(url, { headers: { "Authorization": `Bearer ${authConfig.token}` }}).then((response: any) => {
                    let auth = response.status === 200 ? response.data : null;
                    if (auth) {
                        auth.token = authConfig.token;
                        setLocalStorage('auth', auth);
                        setAxiosHeader(authConfig.token);
                        commit(userTypesStore.Set.Auth, auth);
                        resolve(auth);
                    } else {
                        removeLocalStorage('auth');
                        setAxiosHeader(null);
                        resolve(null);
                    }
                }).catch(err => {
                    console.log(err);
                    removeLocalStorage('auth');
                    setAxiosHeader(null);
                    resolve(null);
                });
            } else {
                removeLocalStorage('auth');
                resolve(null);
            }
        })
        
    },
};

export default actions;
