import Vue from "vue";
import Component from "vue-class-component";
import { UploadServices } from '@/service/upload-service/upload.service';
import { IUser, User } from "@/model/user";
import { UserServices } from "@/service/user-service/user.service";
import { DataHelper } from "@/utils/data-helper";

@Component({
    template: require("./template.html").default,
})
export default class EditUserComponent extends Vue {
    isLoading: boolean = false;
    isUploading: boolean = false;
    uploadservice: UploadServices = new UploadServices();
    userService: UserServices = new UserServices();
    valid: boolean = true;
    dtAvatarUrl: any = '';
    progress: number = 0;
    userModel: IUser = new User({});
    roleList: any = [];

    rules = {
        firstName: [v => !!v || 'Vui lòng nhập họ'],
        lastName: [v => !!v || 'Vui lòng nhập tên'],
        userName: [
            v => !!v || 'Vui lòng nhập tên tài khoản',
            v => !!v && v.length >= 6 || 'Tên tài khoản phải dài ít nhất 6 kí tự'
        ],
        email: [
            v => !!v || 'Vui lòng nhập email',
            v => /.+@.+/.test(v) || 'Địa chỉ email phải hợp lệ',
        ]
    }

    get coRoleList () {
        let list = this.roleList.filter(e => e.name === 'Admin' || e.name === 'DTH')
        return list.map(r => {
            switch (r.name) {
                case 'Admin':
                    r.role = 'Đài khí tượng thủy văn';
                    r.title = 'Xem và chỉnh sửa dữ liệu KTTV';
                    break;
                case 'DTH':
                    r.role = 'Đài truyền hình';
                    r.title = 'Xuất video, tạo kịch bản trên bản đồ, quản lí video';
                    break;
            
                default:
                    break;
            }
            return r;
        });
    }

    get roles () {
        return this.userModel.roleNames;
    }

    set roles (val) {
    }

    get firstLetter () {
        return this.userModel.firstName ? this.userModel.firstName.charAt(0) : "";
    }

    get lastLetter () {
        return this.userModel.lastName ? this.userModel.lastName.charAt(0) : "";
    }

    get color () {
        return DataHelper.generateColorByString(this.userModel.userName);
    }
    
    handleClickOnRole (val) {
        let index = this.roles.indexOf(val);
        if (index === -1) {
            this.userModel.roleNames.push(val);
        } else {
            this.userModel.roleNames.splice(index, 1);
        }
    }

    handleBack() {
        this.$router.go(-1);
    }

    editUser() {
        //@ts-ignore
        this.valid = this.$refs.postForm.validate();
        const vm = this as any;
        if (this.valid) {
            this.isLoading = true;
            this.userService.updateInfo(this.userModel).then(res => {
                this.$toast.success('Chỉnh sửa tài khoản thành công');
                vm.$router.go(-1);
                this.isLoading = false;
            }).catch(err => {
                this.$toast.error('Có lỗi khi chỉnh sửa tài khoản');
                this.$errorMessage(err);
                this.isLoading = false;
            })
        }
    }

    handleClickBrowse() {
        const upload = this.$refs.upload as any;
        upload.click();
    }

    reset() {
        this.dtAvatarUrl = '';
        this.progress = 0;
    }

    onChangeDocuments(pics) {
        if (pics && pics.length > 0) {
            this.processUploadDocuments(pics[0]);
        }
    }

    validateFileExtention(fileName) {
        let acceptableExtension = "image/*";
        if (acceptableExtension.toLowerCase().includes("image/*"))
            acceptableExtension = "image/png,image/jpg,image/jpeg,image/gif";
        let ext = fileName.match(/\.([^\.]+)$/)[1];
        let accepttypes = acceptableExtension.split(",");
        let isValid = accepttypes.filter(c => c.trim().toLowerCase().includes(ext.toString().trim().toLowerCase())).length > 0;
        return isValid;
    }

    processUploadDocuments(file) {
        if (this.validateFileExtention(file.name)) {
            this.isUploading = true;
            this.reset();
            this.uploadDocument({
                Data: file,
                FileName: `${new Date().getTime()}_${file.name}`,
            });
        } else {
            console.log('xxx file name');
        }
    }

    private toBase64(file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            this.dtAvatarUrl = reader.result
        };
    }

    uploadDocument(document) {
        const formData = this.buildUploadDocumentParams(document);
        document.isUploading = true;
        const config = {
            headers: {
                "content-type": "multipart/form-data"
            },
            onUploadProgress: function (progressEvent) {
                var value = (progressEvent.loaded * 100) / progressEvent.total;
                var percent = Math.round(value);
                this.progress = percent;
            }.bind(this)
        };
        this.uploadservice.uploadAvatar(formData, config).then(response => {
            this.isUploading = false;
            this.toBase64(document.Data);
            this.progress = 0;
            this.userModel.avatarUrl = response;
        }).catch(err => {
            this.isUploading = false;
            this.$errorMessage(err);
        });
    }

    buildUploadDocumentParams(document) {
        const formData = new FormData();
        formData.append('Image', document.Data, document.FileName);
        return formData;
    }

    onImgError (event) {
        this.dtAvatarUrl = '';
    }

    async mounted() {
        await this.userService.getAllRole().then((res: any) => {
            this.roleList = res;
        }).catch(error => {
            this.$errorMessage(error);
        });
        
        this.userService.getUserInfoByEmail(this.$route.params.email).then((res: any) => {
            this.userModel = res;
            this.userModel.roleNames = res.roles;
            this.dtAvatarUrl = res.avatarUrl;
        }).catch(error => {
            this.$errorMessage(error);
        });
    }
}
