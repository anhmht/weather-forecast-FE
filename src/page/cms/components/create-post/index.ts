import { Post } from './../../../../model/post/post.model';
import Vue from "vue";
import Component from "vue-class-component";
import CKEditor from '@ckeditor/ckeditor5-vue2';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { PostServices } from '../../../../service/post-service/post.service';
import IPost from "../../../../model/post/post.model";
import { PATH } from '@/constant/route-constant';
import { UploadServices } from "@/service/upload-service/upload.service";
import NO_IMAGE from '../../../../../static/img/no-image/no-image.png';

@Component({
    template: require("./template.html").default,
    components: {
        ckeditor: CKEditor.component
    }
})
export default class CreatePostComponent extends Vue {
    isUploading: boolean = false;
    postService: PostServices = new PostServices();
    uploadservice: UploadServices = new UploadServices();
    valid: boolean = true;
    uploadedDocs: any = NO_IMAGE;
    progress: number = 0

    postModel: IPost = new Post({});

    CKEditorOptions: any = {
        editor: ClassicEditor,
        editorConfig: {
            // The configuration of the editor.
        }
    }

    status: any = [
        {
            text: 'Public',
            value: 1
        },
        {
            text: 'Private',
            value: 2
        },
    ]

    category: any = [
        {
            text: 'Cảnh Báo Thiên Tai',
            value: 'e78c78b7-80d1-4f3b-3014-08d91e5e4dfa'
        },
        {
            text: 'Tin tức',
            value: 2
        },
    ]

    rules = {
        title: [v => !!v || 'Vui lòng nhập tiêu đề'],
        statusRules: [v => !!v || 'Vui lòng chọn trạng thái'],
        categoryRules: [v => !!v || 'Vui lòng chọn danh mục']
    }

    createPost() {
        //@ts-ignore
        this.valid = this.$refs.postForm.validate();
        const vm = this as any;
        if (this.valid) {
            this.postModel.datePosted = new Date().toISOString();
            this.postService.createPost(this.postModel).then(res => {
                vm.$router.push(PATH.LIST_POST);
            }).catch(err => {
                console.log(err);
            })
        }
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
            this.postModel.imageUrl = response;
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
}
