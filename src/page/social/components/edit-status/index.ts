import { ISocialPost, SocialPost } from "@/model/social";
import { SocialServices } from "@/service/social-service/social.service";
import { UploadServices } from "@/service/upload-service/upload.service";
import { DataHelper } from "@/utils/data-helper";
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";
// import NO_IMAGE from '../../../../../static//img/no-image/no-image.png';

const PHOTO_LIMIT = 10;
const VIDEO_LIMIT = 5;
@Component({
    template: require("./template.html").default,
    components: {
        "media-layout": () => import("../../../../components/media-layout/MediaLayoutComponent.vue"),
        "preview-image": () => import("../../../../components/preview-image/PreviewImage.vue"),
        "emoji-picker": () => import("../../../../components/emoji-picker/EmojiPickerComponent.vue")
    }
})
export default class EditStatusComponent extends Vue {
    @Prop({ required: true, default: null })
    postId: string;

    uploadservice: UploadServices = new UploadServices();
    socialService: SocialServices = new SocialServices();
    postModel: ISocialPost = new SocialPost({});
    currentItem: any = null;

    isUploading: boolean = false;
    selectedPhotos: any = [];
    selectedVideos: any = [];

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
        if (this.selectedPhotos.length < PHOTO_LIMIT) {
            const upload = this.$refs.uploadPhoto as any;
            upload.click();
        } else {
            this.$toast.info(`Giới hạn: ${PHOTO_LIMIT} hình ảnh/bài viết.`)
        }
    }

    onChangePhotos(pics) {
        if (pics.length > 0) {
            this.processUploadDocuments(pics, this.mediaType.FOTO);
        }
    }

    handleClickBrowseVideo() {
        if (this.selectedVideos.length < VIDEO_LIMIT) {
            const upload = this.$refs.uploadVideo as any;
            upload.click();
        } else {
            this.$toast.info(`Giới hạn: ${VIDEO_LIMIT} video/bài viết.`)
        }
    }

    onChangeVideos(videos) {
        if (videos.length > 0) {
            this.processUploadDocuments(videos, this.mediaType.VID);
        }
    }

    processUploadDocuments(files, type) {
        let maxLength = files.length;

        switch (type) {
            case this.mediaType.FOTO:
                if ((maxLength + this.selectedPhotos.length) > PHOTO_LIMIT) {
                    this.$toast.info(`Giới hạn: ${PHOTO_LIMIT} hình ảnh/bài viết.`);
                    maxLength = PHOTO_LIMIT - this.selectedPhotos.length;
                }
                break;
            case this.mediaType.VID:
                if ((maxLength + this.selectedVideos.length)> VIDEO_LIMIT) {
                    this.$toast.info(`Giới hạn: ${VIDEO_LIMIT} video/bài viết.`);
                    maxLength = VIDEO_LIMIT - this.selectedVideos.length;
                }
                break;
            default:
                break;
        }

        let uploadingMedia = [];
        for ( let i = 0; i< maxLength; i++) {
            let file = files[i];
            if (this.validateFileExtention(file.name, type)) {
                const Id = this.generateUniqSerial();
                uploadingMedia.push({
                    Id,
                    Data: file,
                    Progress: 0,
                    FileName: `${new Date().getTime()}_${file.name}`,
                    Index: i,
                })
            } else {
                console.log('Lỗi load file: ', file.name);
            }
        }

        uploadingMedia.forEach(e => {
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

    async uploadDocument(document, type) {
        await this.toBase64(document, type);
        this.clearFileBrowser();

        const self = this;
        const formData = this.buildUploadDocumentParams(document);
        const config = {
            headers: {
                "content-type": "multipart/form-data"
            },
            onUploadProgress: function (progressEvent) {
                var value = (progressEvent.loaded * 100) / progressEvent.total;
                var percent = Math.round(value);

                if (type === self.mediaType.FOTO) {
                    // It's not really done
                    percent = percent > 98 ? 98 : percent;
                    var doc = self.selectedPhotos.find(e => e.id === document.Id);
                    if (doc) {
                        doc.progress = percent;
                    }
                } else if (type === self.mediaType.VID) {
                    // It's not really done
                    percent = percent > 95 ? 95 : percent;
                    var doc = self.selectedVideos.find(e => e.id === document.Id);
                    if (doc) {
                        doc.progress = percent;
                    }
                }
                console.log("video-upload", type, document.Id, percent);
                
                // document.Progress = percent;
            }.bind(this)
        };
        
        if (type === this.mediaType.FOTO) {
            this.uploadservice.upload(formData, config).then(response => {
                this.setUploadStatusCompleted(type, document.Id)
                this.onloadedDocument(response, type, document.Id);
            }).catch(err => {
                this.$errorMessage(err);
            });
        }

        if (type === this.mediaType.VID) {
            this.uploadservice.uploadVideoSocial(formData, config).then(response => {
                this.setUploadStatusCompleted(type, document.Id)
                this.onloadedDocument(response[3], type, document.Id); // 1: IOS m3u8; 3: Web + android: mpd
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

    onloadedDocument (url, type, id) {
        if (type === this.mediaType.FOTO) {
            let obj = this.selectedPhotos.find(e => e.id === id);
            if (obj) { obj.uploaded = url }
        }
        if (type === this.mediaType.VID) {
            let obj = this.selectedVideos.find(e => e.id === id);
            if (obj) { obj.uploaded = url }
        }
    }

    private async toBase64(document, type) {
        const file = document.Data;
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            if (type === this.mediaType.FOTO) {
                // this.selectedPhotos.push(reader.result);
                this.selectedPhotos.push({
                    id: document.Id,
                    url: reader.result,
                    progress: document.Progress,
                    uploaded: null,
                    type: 'image'
                });
            }
            if (type === this.mediaType.VID) {
                // this.selectedVideos.push(reader.result);
                this.selectedVideos.push({
                    id: document.Id,
                    url: reader.result,
                    progress: document.Progress,
                    uploaded: null,
                    type: 'video'
                });
            }
        };
    }

    reset() {
        this.selectedPhotos = [];
        this.selectedVideos = [];
        this.postModel = new SocialPost({});
        this.currentItem = null;
    }

    clearFileBrowser () {
        const uploadPhoto = this.$refs.uploadPhoto as any;
        if (uploadPhoto) uploadPhoto.value = [];
        const uploadVideo = this.$refs.uploadVideo as any;
        if (uploadVideo) uploadVideo.value = [];
    }

    setUploadStatusCompleted (type, id) {
        let doc = null;
        if (type === this.mediaType.FOTO) {
            doc = this.selectedPhotos.find(e => e.id === id);
        } else if (type === this.mediaType.VID) {
            doc = this.selectedVideos.find(e => e.id === id);
        }
        if (doc) { doc.progress = 100; }
    }

    handlePreview(data) {
        this.selectedItem = data.medias;
        this.selectedIndex = data.index;
        this.isPreivew = true;
    }

    buildParamsForUpdating () {
        if (this.selectedPhotos.find(e => e.uploaded == null) || this.selectedVideos.find(e => e.uploaded == null)) {
            this.$toast.error('Hình ảnh/Video đang được xử lý.');
            return false;
        }

        this.postModel.imageUrls = this.selectedPhotos.map(e => e.uploaded);
        this.postModel.videoUrls = this.selectedVideos.map(e => e.uploaded);
        return true;
    }

    handleClickOnEmoji (val) {
        const vm = this;
        if (vm.$refs.createTextarea) {
            let cnt = DataHelper.insertCharacterAtCursorPositionOfTextArea(vm.$refs.createTextarea, val);
            this.content = cnt;
        }
    }

    generateUniqSerial() {  
        return 'xxxx-xxxx-xxx-xxxx'.replace(/[x]/g, (c) => {  
            const r = Math.floor(Math.random() * 16);  
            return r.toString(16);  
      });  
    }

    handleSavePost () {
        if (!!this.content && this.content.trim() !== "") {
            if (!this.buildParamsForUpdating()) {
                return;
            }

            this.socialService.editPost(this.postModel)
            .then( res => {
                this.$toast.success('Chỉnh sửa thành công. Bài viết đang được xét duyệt.');
                this.handleClose();
            }).catch( err => {
                this.$toast.error('Có lỗi khi sửa bài');
                console.log(err);
            })
        } else {
            this.$toast.error('Vui lòng nhập nội dung bài viết.');
        }
    }

    handleClose () {
        this.reset();
        this.$emit("handle-close-modal");
    }

    initData () {
        this.postModel = new SocialPost({
            id: this.currentItem.id,
            content: this.currentItem.content,
            imageUrls: this.currentItem.listImageUrl,
            videoUrls: this.currentItem.listVideoUrl,
        });

        (this.currentItem.listImageUrl || []).forEach(e => {
            const Id = this.generateUniqSerial();
            this.selectedPhotos.push({
                id: Id,
                url: e,
                progress: 100,
                uploaded: e,
                type: 'image'
            });
        });

        (this.currentItem.listVideoUrl || []).forEach(e => {
            const Id = this.generateUniqSerial();
            this.selectedVideos.push({
                id: Id,
                url: e,
                progress: 100,
                uploaded: e,
                type: 'video'
            });
        });
    }

    async mounted () {
        
        this.$nextTick(async () => {
            if (this.postId) {
                await this.socialService.getPostDetailForApproval(this.postId).then(res => {
                    this.currentItem = {...res}
                    if (this.currentItem) {
                        this.initData();
                    }
                    
                }).catch(err => {
                    this.reset();
                    console.log(err);
                })
            }
        })
    }

    beforeDestroy () {
        this.reset();
    }
}