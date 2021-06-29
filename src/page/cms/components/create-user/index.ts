import Vue from "vue";
import Component from "vue-class-component";
import NO_IMAGE from '../../../../../static/img/no-image/no-image.png';
import { UploadServices } from '@/service/upload-service/upload.service';
import { IUser, User } from "@/model/user";

@Component({
    template: require("./template.html").default,
})
export default class CreateUserComponent extends Vue {
    isLoading: boolean = false;
    isUploading: boolean = false;
    uploadservice: UploadServices = new UploadServices();
    valid: boolean = true;
    uploadedDocs: any = NO_IMAGE;
    progress: number = 0;
    userModel: IUser = new User({});

    rules = {
        userName: [v => !!v || 'Vui lòng nhập tên tài khoản'],
        email: [v => !!v || 'Vui lòng nhập email'],
        password: [v => !!v || 'Vui lòng nhập mật khẩu'],
        status: [v => !!v || 'Vui lòng chọn trạng thái']
    }

    handleBack() {
        this.$router.go(-1);
    }

    createPost() {

    }

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
        this.uploadservice.upload(formData, config).then(response => {
            this.isUploading = false;
            this.toBase64(document.Data);
            this.progress = 0;
            // this.postModel.imageUrl = response;
        }).catch(err => {
            this.isUploading = false;
            console.error(err);
        });
    }

    buildUploadDocumentParams(document) {
        const formData = new FormData();
        formData.append('file', document.Data, document.FileName);
        return formData;
    }

    mounted() {

    }
}
