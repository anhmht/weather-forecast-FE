import { IUserSearchParam, UserSearchParam } from './../../../../model/user/user-info.model';
import { UserServices } from "@/service/user-service/user.service";
import Vue from "vue";
import Component from "vue-class-component";
import { ROUTE_NAME } from '@/constant/route-constant';

@Component({
    template: require("./template.html").default,
})
export default class ListUserComponent extends Vue {
    userSearchParams: IUserSearchParam = new UserSearchParam({});
    userService: UserServices = new UserServices();
    users: any = [];
    totalItems: number = 0;
    totalPages: number = 0;
    limitPerPage: number[] = [5, 10, 15, 20];
    numUsersInPage: number = 0;
    visibleConfirm: boolean = false;
    selectedId: string = null;

    get TotalPageVisible() {
        if (this.totalPages < 7)
            return this.totalPages
        else
            return 7
    }

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

    editUser(id) {

    }

    handleDeleteUser(id) {

    }

    deleteUser() {

    }

    async getUsersByLimit(value = null) {
        this.userSearchParams.page = 1;
        await this.getUsers();
        if (this.userSearchParams.limit <= this.totalItems) {
            this.numUsersInPage = this.userSearchParams.limit;
        } else {
            this.numUsersInPage = this.totalItems;
        }
    }

    async getUsersByPaging() {
        await this.getUsers();
        if (this.userSearchParams.limit * this.userSearchParams.page <= this.totalItems) {
            this.numUsersInPage = this.userSearchParams.limit * this.userSearchParams.page;
        } else {
            this.numUsersInPage = this.totalItems;
        }
    }

    async getUsers() {
        await this.userService.getAllUser(this.userSearchParams).then((res: any) => {
            this.users = res.users;
            this.totalItems = res.totalItems;
            this.totalPages = res.totalPages;
        }).catch(error => {
            console.log(error);
        });
    }

    async mounted() {
        await this.userService.getAllRole().then((res: any) => {
            if (this.$route.params.role === 'admin') {
                for (let i = 0; i < res.length; i++) {
                    this.userSearchParams.roleIds.push(res[i].name);
                }
            }
        }).catch(error => {
            console.log(error);
        });

        await this.getUsers();

        if (this.userSearchParams.limit <= this.totalItems) {
            this.numUsersInPage = this.userSearchParams.limit;
        } else {
            this.numUsersInPage = this.totalItems;
        }
    }
}
