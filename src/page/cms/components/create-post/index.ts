import { Post } from './../../../../model/post/post.model';
import Vue from "vue";
import Component from "vue-class-component";
import { PostServices } from '../../../../service/post-service/post.service';
import IPost from "../../../../model/post/post.model";
import { UploadServices } from "@/service/upload-service/upload.service";
import NO_IMAGE from '../../../../../static/img/no-image/no-image.png';
import { CategoryServices } from '../../../../service/category-service/category.service';
import ICategory from './../../../../model/category/category.model';
import IStatus from './../../../../model/status/status.model';
import { namespace, Getter, Action } from "vuex-class";
import { storeModules } from '@/store';
import lookupTypesStore from '@/store/lookup/lookup-types.store';

const LookupGetter = namespace(storeModules.Lookup, Getter);
const LookupAction = namespace(storeModules.Lookup, Action);

@Component({
    template: require("./template.html").default,
    components: {
        "custom-ckeditor": () => import("../../../../components/ckeditor"),
    }
})
export default class CreatePostComponent extends Vue {
    isLoading: boolean = false;
    isUploading: boolean = false;
    postService: PostServices = new PostServices();
    uploadservice: UploadServices = new UploadServices();
    categoryService: CategoryServices = new CategoryServices();
    valid: boolean = true;
    uploadedDocs: any = NO_IMAGE;
    progress: number = 0

    postModel: IPost = new Post({});

    category: ICategory[] = []

    rules = {
        title: [v => !!v || 'Vui lòng nhập tiêu đề'],
        statusRules: [v => !!v || 'Vui lòng chọn trạng thái'],
        categoryRules: [v => !!v || 'Vui lòng chọn danh mục']
    }

    @LookupGetter(lookupTypesStore.Get.STATUS) status: IStatus[]
    @LookupAction getLookupData: (type: string) => void;

    createPost() {
        //@ts-ignore
        this.valid = this.$refs.postForm.validate();
        const vm = this as any;
        if (this.valid) {
            this.postModel.datePosted = new Date().toISOString();
            this.isLoading = true;
            this.postService.createPost(this.postModel).then(res => {
                vm.$router.go(-1);
                this.isLoading = false;
            }).catch(err => {
                console.log(err);
                this.isLoading = false;
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

    mounted() {
        this.isLoading = true;
        // Get category
        this.categoryService.getAllCategories().then((res: any) => {
            this.category = res;
            this.postModel.categoryId = this.$route.query.categoryId as any;
            this.isLoading = false;
        }).catch(error => {
            console.log(error);
            this.isLoading = false;
        })

        this.getLookupData(lookupTypesStore.Set.STATUS);
    }
}
