import { ActionTree, GetterTree, Module, MutationTree } from 'vuex';
import { ILookupState, LookupState } from './lookup-states.store';

import actions from './lookup-actions.store';
import getters from './lookup-getters.store';
import mutations from './lookup-mutations.store';

export class LookupModule<RootState> implements Module<ILookupState, RootState>{
  namespaced: boolean;
  state: ILookupState;
  getters: GetterTree<ILookupState, RootState>;
  actions: ActionTree<ILookupState, RootState>;
  mutations: MutationTree<ILookupState>;
  /**
   *
   */
  constructor() {
    this.namespaced = true;
    this.state = new LookupState({})
    this.mutations = mutations;
    this.actions = actions;
    this.getters = getters;
  }
}
