import { ISocialPost, SocialPost } from "@/model/social";
import { SocialServices } from "@/service/social-service/social.service";
import { UploadServices } from "@/service/upload-service/upload.service";
import Vue from "vue";
import Component from "vue-class-component";
// import NO_IMAGE from '../../../../../static//img/no-image/no-image.png';
@Component({
    template: require("./template.html").default,
    components: {
        "media-layout": () => import("../../../../components/media-layout/MediaLayoutComponent.vue"),
        "preview-image": () => import("../../../../components/preview-image/PreviewImage.vue"),
    }
})
export default class CreateSatusComponent extends Vue {

    uploadservice: UploadServices = new UploadServices();
    socialService: SocialServices = new SocialServices();
    postModel: ISocialPost = new SocialPost({});

    isUploading: boolean = false;
    selectedPhotos: any = [];
    selectedPVideos: any = [];
    uploadingMedia: any = [];

    isPreivew: boolean = false;
    selectedItem: any = [];
    selectedIndex: number = 0;

    get mediaType () {
        return {
            'FOTO': 1,
            'VID': 2
        }
    }

    get content () {
        return this.postModel.content;
    }

    set content (val) {
        this.postModel.content = val;
    }

    handleClickBrowsePhoto() {
        const upload = this.$refs.uploadPhoto as any;
        upload.click();
    }

    onChangePhotos(pics) {
        if (pics.length > 0) {
            this.processUploadDocuments(pics, this.mediaType.FOTO);
        }
    }

    handleClickBrowseVideo() {
        const upload = this.$refs.uploadVideo as any;
        upload.click();
    }

    onChangeVideos(videos) {
        if (videos.length > 0) {
            this.processUploadDocuments(videos, this.mediaType.VID);
        }
    }

    processUploadDocuments(files, type) {
        for ( let i = 0; i< files.length; i++) {
            let file = files[i];
            if (this.validateFileExtention(file.name, type)) {
                this.uploadingMedia.push({
                    Data: file,
                    Progress: 0,
                    FileName: `${new Date().getTime()}_${file.name}`,
                    Index: i,
                })
            } else {
                console.log('Lỗi load file: ', file.name);
            }
        }

        this.uploadingMedia.forEach(e => {
            this.uploadDocument(e, type);
        });
    }

    validateFileExtention(fileName, type) {
        if (type === this.mediaType.FOTO) {
            let acceptableExtension = "image/*";
            if (acceptableExtension.toLowerCase().includes("image/*"))
                acceptableExtension = "image/png,image/jpg,image/jpeg,image/gif";
            let ext = fileName.match(/\.([^\.]+)$/)[1];
            let accepttypes = acceptableExtension.split(",");
            let isValid = accepttypes.filter(c => c.trim().toLowerCase().includes(ext.toString().trim().toLowerCase())).length > 0;
            return isValid;
        }
        if (type === this.mediaType.VID) {
            let acceptableExtension = "video/*";
            if (acceptableExtension.toLowerCase().includes("video/*"))
                acceptableExtension = "	application/x-mpegURL, video/x-flv, video/x-ms-wmv, video/quicktime, video/3gpp, video/x-msvideo ,video/mp4";
            let ext = fileName.match(/\.([^\.]+)$/)[1];
            let accepttypes = acceptableExtension.split(",");
            let isValid = accepttypes.filter(c => c.trim().toLowerCase().includes(ext.toString().trim().toLowerCase())).length > 0;
            return isValid;
            return true;
        }
        return false;
    }

    uploadDocument(document, type) {
        const formData = this.buildUploadDocumentParams(document);
        document.isUploading = true;
        const config = {
            headers: {
                "content-type": "multipart/form-data"
            },
            onUploadProgress: function (progressEvent) {
                var value = (progressEvent.loaded * 100) / progressEvent.total;
                var percent = Math.round(value);
                document.progress = percent;
            }.bind(this)
        };
        if (type === this.mediaType.FOTO) {
            this.uploadservice.upload(formData, config).then(response => {
                const docIndex = this.uploadingMedia.findIndex(e => e.Index === document.Index);
                this.uploadingMedia.splice(docIndex, 1);
                this.onloadedDocument(response, type);
                this.toBase64(document.Data, type);
            }).catch(err => {
                this.$errorMessage(err);
            });
        }

        if (type === this.mediaType.VID) {
            this.uploadservice.uploadFile(formData, config).then(response => {
                const docIndex = this.uploadingMedia.findIndex(e => e.Index === document.Index);
                this.uploadingMedia.splice(docIndex, 1);
                this.onloadedDocument(response, type);
                this.toBase64(document.Data, type);
            }).catch(err => {
                this.$errorMessage(err);
            });
        }
        
    }

    buildUploadDocumentParams(document) {
        const formData = new FormData();
        formData.append('file', document.Data, document.FileName);
        return formData;
    }

    onloadedDocument (url, type) {
        if (type === this.mediaType.FOTO) {
            this.postModel.imageUrls.push(url);
        }
        if (type === this.mediaType.VID) {
            this.postModel.videoUrls.push(url);
        }
    }

    private toBase64(file, type) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            if (type === this.mediaType.FOTO) {
                this.selectedPhotos.push(reader.result);
            }
            if (type === this.mediaType.VID) {
                this.selectedPVideos.push(reader.result);
            }
        };
    }

    reset() {
        this.selectedPhotos = [];
        this.selectedPVideos = [];
        this.postModel = new SocialPost({});
    }

    handlePreview(data) {
        this.selectedItem = data.medias;
        this.selectedIndex = data.index;
        this.isPreivew = true;
    }

    handlePost () {
        if (!!this.content && this.content.trim() !== "") {
            this.socialService.createPost(this.postModel)
            .then( res => {
                this.$toast.success('Đăng bài mới thành công. Bài viết đang được xét duyệt.');
                this.reset();
            }).catch( err => {
                this.$toast.error('Có lỗi khi đăng bài');
                console.log(err);
            })
        } else {
            this.$toast.error('Vui lòng nhập nội dung bài viết.');
        }
    }
}