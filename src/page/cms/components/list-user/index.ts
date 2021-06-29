import { IUserSearchParam, UserSearchParam } from './../../../../model/user/user-info.model';

import { UserServices } from "@/service/user-service/user.service";
import Vue from "vue";
import Component from "vue-class-component";
import { ROUTE_NAME } from '@/constant/route-constant';

@Component({
    template: require("./template.html").default,
})
export default class ListUserComponent extends Vue {
    userSearchParams: IUserSearchParam = new UserSearchParam();
    userService: UserServices = new UserServices();
    users: any = [];

    get listUserTitle() {
        return this.$route.params.role === 'admin' ? 'Danh sách quản trị viên' : 'Danh sách người dùng'
    }
    get createUserTitle() {
        return this.$route.params.role === 'admin' ? 'Tạo quản trị viên' : 'Tạo người dùng'
    }

    toCreateUser() {
        this.$router.push({
            name: ROUTE_NAME.CREATE_USER,
            params: { role: this.$route.params.role }
        });
    }

    mounted() {
        this.userService.getAllUser(this.userSearchParams).then((res: any) => {
            this.users = res.users;

        })
    }

}
