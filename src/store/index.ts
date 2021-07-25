import Vuex, { ModuleTree, Store } from "vuex";
import Vue from "vue";
import { ILookupState } from "./lookup/lookup-states.store";
import { LookupModule } from "./lookup";
import { UserModule } from "./user";

Vue.use(Vuex);

export interface IRootState {
    lookup?: ILookupState;
}

const store: Store<IRootState> = new Store<IRootState>({
    strict: true,
    modules: <ModuleTree<IRootState>>{
        lookup: new LookupModule<IRootState>(),
        user: new UserModule<IRootState>(),
    },
});


const storeModules = {
    Lookup: "lookup",
    User: "user",
};

export { store as default, storeModules };
