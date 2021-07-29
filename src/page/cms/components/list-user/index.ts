import { IUserSearchParam, UserSearchParam } from './../../../../model/user/user-info.model';
import { UserServices } from "@/service/user-service/user.service";
import Vue from "vue";
import Component from "vue-class-component";
import { ROUTE_NAME } from '@/constant/route-constant';
import { Watch } from 'vue-property-decorator';
import NO_IMAGE from '../../../../../static/img/no-image/no-image.png';

const USER = 'NormalUser';
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
    listAdminTitleConst: string = 'Danh sách quản trị viên';
    listUserTitleConst: string = 'Danh sách người dùng';
    createAdminTitleConst: string = 'Tạo quản trị viên';

    get TotalPageVisible() {
        if (this.totalPages < 7)
            return this.totalPages
        else
            return 7
    }

    get listUserTitle() {
        return this.$route.params.role === 'admin' ? this.listAdminTitleConst : this.listUserTitleConst
    }
    get createUserTitle() {
        return this.$route.params.role === 'admin' ? this.createAdminTitleConst : ''
    }
    get isDisplayButton() {
        return this.$route.params.role === 'admin' ? true : false
    }

    get defaultImage () {
        return NO_IMAGE;
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

    async getRoles(title) {
        if (title === this.listAdminTitleConst) {
            await this.userService.getAllRole().then((res: any) => {
                this.userSearchParams.roleIds = res.filter(x => x.name !== USER).map(x => x.name);
            }).catch(error => {
                console.log(error);
            });
        } else if (title === this.listUserTitleConst) {
            this.userSearchParams.roleIds.push(USER);
        }
    }

    onImgError (event) {
        event.target.src = NO_IMAGE;
    }

    async mounted() {
        await this.getRoles(this.listUserTitle);
        await this.getUsers();

        if (this.userSearchParams.limit <= this.totalItems) {
            this.numUsersInPage = this.userSearchParams.limit;
        } else {
            this.numUsersInPage = this.totalItems;
        }
    }

    @Watch('listUserTitle')
    async handleChangeCategory(val, old) {
        if(val && val !== old) {
            this.userSearchParams = new UserSearchParam({});
            
            await this.getRoles(val);
            await this.getUsers();

            if (this.userSearchParams.limit <= this.totalItems) {
                this.numUsersInPage = this.userSearchParams.limit;
            } else {
                this.numUsersInPage = this.totalItems;
            }
        }
    }
}