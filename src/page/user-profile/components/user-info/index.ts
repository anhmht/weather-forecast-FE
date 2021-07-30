import { IUser, User } from './../../../../model/user/user-authenticate.model';
// import { getLocalStorage } from './../../../../utils/appConfig';
import { UploadServices } from '@/service/upload-service/upload.service';
import Vue from 'vue';
import Component from 'vue-class-component';
import NO_IMAGE from '../../../../../static/img/no-image/no-image.png';
import { UserServices } from '@/service/user-service/user.service';
import { Getter, namespace } from 'vuex-class';
import { storeModules } from '@/store';
import userTypesStore from '@/store/user/user-types.store';

const UserGetter = namespace(storeModules.User, Getter);
@Component({
    template: require("./template.html").default,

})
export default class UserInfoComponent extends Vue {
    isLoading: boolean = false;
    uploadedDocs: any = NO_IMAGE;
    progress: number = 0;
    isUploading: boolean = false;
    uploadservice: UploadServices = new UploadServices();
    userService: UserServices = new UserServices();

    rules = {
        userName: [v => !!v || 'Vui lòng nhập tên tài khoản'],
        email: [
            v => !!v || 'Vui lòng nhập E-mail',
            v => /.+@.+\..+/.test(v) || 'Định dạng E-mail không đúng',
        ],
    }

    data: IUser = new User({});
    isValid: boolean = false;

    @UserGetter(userTypesStore.Get.Auth) userConfig: any;

    handleClickBrowse() {
        const upload = this.$refs.upload as any;
        upload.click();
    }

    reset() {
        this.uploadedDocs = NO_IMAGE;
        this.progress = 0;
    }

    onChangeDocuments(pics) {
        if (pics.length > 0) {
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
            this.uploadedDocs = reader.result
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
            this.data.avatarUrl = response;
        }).catch(err => {
            this.isUploading = false;
            this.$errorMessage(err);
        });
    }

    buildUploadDocumentParams(document) {
        const formData = new FormData();
        // const cached = getLocalStorage('auth');
        const cached = this.userConfig;
        formData.append('Image', document.Data, document.FileName);
        formData.append('UserId', cached.id);
        return formData;
    }

    handleSave() {
        this.userService.updateInfo(this.data).then(res => {
            console.log(res);

        }).catch(err => {
            this.$errorMessage(err);
        })
    }

    onImgError (event) {
        event.target.src = NO_IMAGE;
    }

    mounted() {
        // const userInfo = getLocalStorage('auth');
        const userInfo = this.userConfig;
        if(userInfo) {
            this.data = new User(userInfo);
            this.uploadedDocs = userInfo.avatarUrl;
        }
    }
}
