import { ActionTree, GetterTree, Module, MutationTree } from 'vuex';
import { IUserState, UserState } from './user-states.store';

import actions from './user-actions.store';
import getters from './user-getters.store';
import mutations from './user-mutations.store';

export class UserModule<RootState> implements Module<IUserState, RootState>{
  namespaced: boolean;
  state: IUserState;
  getters: GetterTree<IUserState, RootState>;
  actions: ActionTree<IUserState, RootState>;
  mutations: MutationTree<IUserState>;
  /**
   *
   */
  constructor() {
    this.namespaced = true;
    this.state = new UserState({})
    this.mutations = mutations;
    this.actions = actions;
    this.getters = getters;
  }
}
