import Vue from "vue";
import Component from "vue-class-component";
import { Post } from "@/model/post";
import IPost from "@/model/post/post.model";
import ICategory from '@/model/category/category.model';
import IStatus from "@/model/status/status.model";
import { namespace, Getter, Action } from "vuex-class";
import { storeModules } from '@/store';
import lookupTypesStore from '@/store/lookup/lookup-types.store';
import moment from "moment";
import 'moment/locale/vi';
import { CategoryServices } from "@/service/category-service/category.service";
import { UploadServices } from "@/service/upload-service/upload.service";
import { PostServices } from "@/service/post-service/post.service";

const LookupGetter = namespace(storeModules.Lookup, Getter);
const LookupAction = namespace(storeModules.Lookup, Action);

@Component({
    template: require("./template.html").default,
    components: {
        "custom-ckeditor": () => import("../../../../components/ckeditor"),
    }
})
export default class EditDocumentComponent extends Vue {
    documents: any = [];
    uploadedFile: any = [];
    isUploading: boolean = false;
    isLoading: boolean = false;
    valid: boolean = true;
    publishStatus: string = "Publish";
    categoryService: CategoryServices = new CategoryServices();
    uploadService: UploadServices = new UploadServices();
    postService: PostServices = new PostServices();

    postModel: IPost = new Post({});

    category: ICategory[] = []

    rules = {
        title: [v => !!v || 'Vui lòng nhập tiêu đề']
    }

    @LookupGetter(lookupTypesStore.Get.STATUS) status: IStatus[]
    @LookupAction getLookupData: (type: string) => void;

    handleBack() {
        this.$router.go(-1);
    }

    handleClickBrowse() {
        const upload = this.$refs.upload as any;
        upload.click();
    }

    onChangeDocuments(file) {
        if (file.length > 0) {
            this.uploadedFile = file;
            this.processUploadDocuments(file[0]);
        }
    }

    processUploadDocuments(file) {
        this.isUploading = true;
        this.uploadDocument({
            Data: file,
            FileName: `${new Date().getTime()}_${file.name}`,
        });
    }

    uploadDocument(document) {
        const formData = this.buildUploadDocumentParams(document);
        document.isUploading = true;
        const config = {
            headers: {
                "content-type": "multipart/form-data"
            }
        };
        this.uploadService.uploadFile(formData, config).then(response => {
            this.isUploading = false;
            this.postModel.documents.push({
                name: this.uploadedFile[0].name,
                url: response
            });
            this.documents.push({
                icon: this.getFileTypeIcon(this.uploadedFile[0].name.split('.')[1]),
                name: this.uploadedFile[0].name,
                createDate: moment().format('DD/MM/YYYY HH:mm:ss'),
                contentLength: this.convertFileSize(this.uploadedFile[0].size),
                url: response
            });
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

    getFileTypeIcon(fileExtension) {
        let icon: string = null;

        switch(fileExtension) {
            case 'doc':
                icon = 'mdi-file-word';
                break;
            case 'docx':
                icon = 'mdi-file-word';
                break;
            case 'xls':
                icon = 'mdi-file-excel';
                break;
            case 'xlsx':
                icon = 'mdi-file-excel';
                break;
            case 'ppt':
                icon = 'mdi-file-powerpoint';
                break;
            case 'pptx':
                icon = 'mdi-file-powerpoint';
                break;
            default:
                icon = 'mdi-file';
                break;
        }

        return icon;
    }

    convertFileSize(inputFileSize) {
        let fileSize: string = null;

        if (inputFileSize < 1024) {
            fileSize = inputFileSize + ' B';
        } else if (inputFileSize >= 1024 && inputFileSize < 1024 * 1024) {
            fileSize = Math.floor(inputFileSize / 1024) + ' KB';
        } else if (inputFileSize >= 1024 * 1024) {
            fileSize = Math.floor(inputFileSize / 1024 / 1024) + ' MB';
        }

        return fileSize;
    }

    deleteDocument(documentUrl) {
        for (let i = 0; i < this.documents.length; i++) {
            if (this.documents[i].url === documentUrl) {
                this.documents.splice(i, 1);
            }
        }
        for (let i = 0; i < this.postModel.documents.length; i++) {
            if (this.postModel.documents[i].url === documentUrl) {
                this.postModel.documents.splice(i, 1);
            }
        }
    }

    editDocument() {
        //@ts-ignore
        this.valid = this.$refs.postForm.validate();
        if (this.valid) {
            this.postModel.datePosted = new Date().toISOString();
            this.isLoading = true;
            this.postModel.statusId = this.status.find(x => x.name === this.publishStatus).statusId;

            this.postService.editPost(this.postModel).then(res => {
                this.$toast.success('Chỉnh sửa tin thành công');
                this.$router.go(-1);
                this.isLoading = false;
            }).catch(err => {
                this.$toast.error('Có lỗi khi chỉnh sửa tin');
                console.log(err);
                this.isLoading = false;
            })
        }
    }

    async mounted() {
        this.isLoading = true;
        // Get category
        await this.categoryService.getAllCategories().then((res: any) => {
            this.category = res;
            this.postModel.categoryId = this.$route.query.categoryId as any;
            this.isLoading = false;
        }).catch(error => {
            console.log(error);
            this.isLoading = false;
        });
        // Get event by id
        this.postService.getPostById(this.$route.params.id).then((res: any) => {
            this.postModel = res;
            // this.documents = res.documents;
            for (let i = 0; i < res.documents.length; i++) {
                this.documents.push({
                    icon: this.getFileTypeIcon(res.documents[i].name.split('.')[1]),
                    name: res.documents[i].name,
                    createDate: res.documents[i].createDate,
                    contentLength: this.convertFileSize(res.documents[i].contentLength),
                    url: res.documents[i].url
                });
            }
            this.isLoading = false;
        }).catch(error => {
            console.log(error);
            this.isLoading = false;
        });

        for (let i = 0; i < this.documents.length; i++) {
            this.documents[i].icon = this.getFileTypeIcon(this.documents[i].name.split('.')[1]);
            this.documents[i].contentLength = this.convertFileSize(this.documents[i].contentLength);
        }

        this.getLookupData(lookupTypesStore.Set.STATUS);
    }
}
