import Vue from "vue";
import Component from "vue-class-component";
import { Post } from "@/model/post";
import IPost from "@/model/post/post.model";
import ICategory from '@/model/category/category.model';
import IStatus from "@/model/status/status.model";
import excel from "../../../../../static/img/file-type-icon/excel.png";
import file from "../../../../../static/img/file-type-icon/file.png";
import pdf from "../../../../../static/img/file-type-icon/pdf.png";
import picture from "../../../../../static/img/file-type-icon/picture.png";
import powerpoint from "../../../../../static/img/file-type-icon/powerpoint.png";
import videoPlayer from "../../../../../static/img/file-type-icon/video-player.png";
import word from "../../../../../static/img/file-type-icon/word.png";
import zip from "../../../../../static/img/file-type-icon/zip.png";
import { namespace, Getter, Action } from "vuex-class";
import { storeModules } from '@/store';
import lookupTypesStore from '@/store/lookup/lookup-types.store';
import moment from "moment";
import 'moment/locale/vi';
import { CategoryServices } from "@/service/category-service/category.service";
import { UploadServices } from "@/service/upload-service/upload.service";
import { PostServices } from "@/service/post-service/post.service";
import userTypesStore from "@/store/user/user-types.store";
import { USER_ROLE } from "@/constant/common-constant";


const UserGetter = namespace(storeModules.User, Getter);
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
    visibleConfirm: boolean = false;
    publishStatus: string = "Publish";
    categoryService: CategoryServices = new CategoryServices();
    uploadService: UploadServices = new UploadServices();
    postService: PostServices = new PostServices();

    postModel: IPost = new Post({});

    category: ICategory[] = []

    rules = {
        title: [v => !!v || 'Vui l??ng nh???p ti??u ?????']
    }

    @LookupGetter(lookupTypesStore.Get.STATUS) status: IStatus[]
    @LookupAction getLookupData: (type: string) => void;
    @UserGetter(userTypesStore.Get.Auth) userConfig: any;

    get isAdmin () {
        if (this.userConfig && this.userConfig['roles']) {
            return !!this.userConfig['roles'].find(r => r === USER_ROLE.SUPER || r === USER_ROLE.KTTV);
        }
        return false;
    }
    
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
                url: response,
                link: this.getEmbeddedPreviewer(this.uploadedFile[0].name.split('.')[1], response)
            });
        }).catch(err => {
            this.isUploading = false;
            this.$errorMessage(err);
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
            case 'docx':
                icon = word;
                break;
            case 'xls':
            case 'xlsx':
                icon = excel;
                break;
            case 'ppt':
            case 'pptx':
                icon = powerpoint;
                break;
            case 'pdf':
                icon = pdf;
                break;
            case 'jpg':
            case 'tif':
            case 'png':
            case 'gif':
                icon = picture;
                break;
            case 'zip':
            case '7z':
            case 'rar':
                icon = zip;
                break;
            case 'mp4':
            case 'mov':
            case 'avi':
                icon = videoPlayer;
                break;
            default:
                icon = file;
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

    previewDocument() {
        this.visibleConfirm = true;
    }

    getEmbeddedPreviewer(fileExtension, fileUrl) {
        let previewer: string = null;

        switch(fileExtension) {
            case 'doc':
            case 'docx':
            case 'xls':
            case 'xlsx':
            case 'ppt':
            case 'pptx':
                previewer = `https://view.officeapps.live.com/op/embed.aspx?src=${fileUrl}`;
                break;
            default:
                previewer = `https://docs.google.com/gview?url=${fileUrl}&embedded=true`;
                break;
        }

        return previewer;
    }

    downloadDocument(item) {
        const downloadLink = document.createElement('a');
        downloadLink.setAttribute('href', item.url);
        downloadLink.setAttribute('download', item.name);
        downloadLink.click();
    }

    editDocument() {
        //@ts-ignore
        this.valid = this.$refs.postForm.validate();
        if (this.valid) {
            this.postModel.datePosted = new Date().toISOString();
            this.isLoading = true;
            this.postModel.statusId = this.status.find(x => x.name === this.publishStatus).statusId;

            this.postService.editPost(this.postModel).then(res => {
                this.$toast.success('Ch???nh s???a tin th??nh c??ng');
                this.$router.go(-1);
                this.isLoading = false;
            }).catch(err => {
                this.$toast.error('C?? l???i khi ch???nh s???a tin');
                this.$errorMessage(err);
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
            this.$errorMessage(error);
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
                    url: res.documents[i].url,
                    link: this.getEmbeddedPreviewer(res.documents[i].name.split('.')[1], res.documents[i].url)
                });
            }
            this.isLoading = false;
        }).catch(error => {
            this.$errorMessage(error);
            this.isLoading = false;
        });

        for (let i = 0; i < this.documents.length; i++) {
            this.documents[i].icon = this.getFileTypeIcon(this.documents[i].name.split('.')[1]);
            this.documents[i].contentLength = this.convertFileSize(this.documents[i].contentLength);
        }

        this.getLookupData(lookupTypesStore.Set.STATUS);
    }
}
