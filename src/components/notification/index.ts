import { storeModules } from '@/store';
import userTypesStore from '@/store/user/user-types.store';
import { DataHelper } from '@/utils/data-helper';
import Vue from 'vue';
import Component from 'vue-class-component';
import { Getter, namespace } from 'vuex-class';

const UserGetter = namespace(storeModules.User, Getter);

@Component({
    template: require("./template.html").default,
})
export default class NotificationComponent extends Vue {
    @UserGetter(userTypesStore.Get.Auth) userConfig: any;


    color(name) {
        return DataHelper.generateColorByString(name);
    }
}