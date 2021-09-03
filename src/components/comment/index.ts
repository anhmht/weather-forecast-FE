
import { IPostComment } from "@/model/post/social-comment-post.model";
import { Comment } from "@/model/social/comment.model";
import { SocialServices } from "@/service/social-service/social.service";
import { UploadServices } from "@/service/upload-service/upload.service";
import { storeModules } from "@/store";
import userTypesStore from "@/store/user/user-types.store";
import { DataHelper } from "@/utils/data-helper";
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";
import { Getter, namespace } from "vuex-class";

const UserGetter = namespace(storeModules.User, Getter);
@Component({
    template: require("./template.html").default,
    components: {
        "emoji-picker": () => import("../../components/emoji-picker/EmojiPickerComponent.vue"),
        "reaction": () => import("../reaction/ReactionComponent.vue"),
        "reaction-count": () => import("../reaction-count/ReactionCountComponent.vue"),
        "sub-comment": () => import("../sub-comment/SubCommentComponent.vue")
    }
})
export default class CommentComponent extends Vue {
    @Prop({ required: true }) id;
    @Prop({ type: String, default: null }) postId;
    @Prop({ type: Boolean, default: false }) subComment;

    @UserGetter(userTypesStore.Get.Auth) userConfig: any;

    newComment: string = '';
    isLoading: boolean = false;
    isUploading: boolean = false;
    totalPages: number = 0;
    service: SocialServices = new SocialServices();
    uploadservice: UploadServices = new UploadServices();
    searchParam = {
        limit: 5,
        page: 1
    }

    commentList: IPostComment[] = [];
    isAvatarError: boolean = false;
    isDisplaySubComment: boolean = false;
    uploadedDocs: any = null;
    progress: number = 0;
    uploadMediaType: string = 'image';
    uploadResult: any = null;

    preview: any = null;

    get visibleLoadMore() {
        return this.searchParam.page < this.totalPages
    }

    get loginInfo() {
        if (!this.userConfig) return {shortName: 'US'};
        return this.userConfig
    }

    get avatar() {
        if (this.loginInfo) {
            return this.loginInfo.avatarUrl;
        }
        return null;
    }

    get uploadSrc() {
        return this.uploadResult;
    }

    onImgError(event) {
        this.isAvatarError = true;
    }

    getColor(name) {
        return DataHelper.generateColorByString(name);
    }

    renderText(comment) {
        return comment.length >= 255 ? comment.slice(0, 255) + '...' : comment
    }

    handleClickOnEmoji(val) {
        const vm = this;
        if (vm.$refs.commentTextarea) {
            let cnt = DataHelper.insertCharacterAtCursorPositionOfTextArea(vm.$refs.commentTextarea, val);
            this.newComment = cnt;
        }
    }

    handleNewLine() {
        this.newComment = `${this.newComment}\n`;
    }

    handleLoadMoreComment() {
        if (this.searchParam.page < this.totalPages) {
            this.searchParam.page += 1;
            this.fetchData();
        }
    }

    async handleReaction(data, comment) {
        const isReactionToThisComment = comment.actionIcons.find(x => x.isCurrentUserChecking);
        if (isReactionToThisComment) {
            await this.removeReactionFromComment(comment.id);
            this.addReactionToComment(comment.id, data.valueId);
        } else {
            this.addReactionToComment(comment.id, data.valueId);
        }
    }

    handleLike(currentChecking, commentId) {
        if (currentChecking !== null) {
            this.addReactionToComment(commentId, 1);
        } else {
            this.removeReactionFromComment(commentId);
        }
    }

    addReactionToComment(commentId, iconId) {
        this.service.addReactionToComment(commentId, iconId)
            .then(() => {
                this.updateCommentList(commentId, iconId);
            }).catch(error => {
                this.$errorMessage(error);
            });
    }

    async removeReactionFromComment(commentId) {
        return await this.service.removeReactionFromComment(commentId)
            .then(() => {
                const index = this.commentList.findIndex(x => x.id === commentId);
                const currentActionIndex = this.commentList[index].actionIcons.findIndex(x => x.isCurrentUserChecking);
                if (this.commentList[index].actionIcons[currentActionIndex].count === 1) {
                    this.commentList[index].actionIcons.splice(currentActionIndex, 1);
                    return;
                }
                Vue.set(this.commentList[index].actionIcons[currentActionIndex], 'isCurrentUserChecking', false);
                Vue.set(this.commentList[index].actionIcons[currentActionIndex], 'count', this.commentList[index].actionIcons[currentActionIndex].count - 1);
                console.log(this.commentList[index].actionIcons[currentActionIndex]);
                
            }).catch(error => {
                this.$errorMessage(error);
            });
    }

    updateCommentList(commentId, iconId) {
        const index = this.commentList.findIndex(x => x.id === commentId);
        const iconIndex = this.commentList[index].actionIcons.findIndex(x => x.iconId === iconId);
        if (iconIndex > -1) {
            Vue.set(this.commentList[index].actionIcons[iconIndex], 'iconId', iconId);
            Vue.set(this.commentList[index].actionIcons[iconIndex], 'isCurrentUserChecking', true);
            Vue.set(this.commentList[index].actionIcons[iconIndex], 'count', this.commentList[index].actionIcons[iconIndex].count + 1);
            Vue.set(this.commentList[index].actionIcons[iconIndex], 'fullNames', [...this.commentList[index].actionIcons[iconIndex].fullNames, this.userConfig.firstName]);
        } else {
            this.commentList[index].actionIcons.push({
                count: 1,
                iconId,
                fullNames: [this.userConfig.firstName],
                isCurrentUserChecking: true
            })
        }
    }

    handleLoadSubComment(id) {
        const comment = this.commentList.find(x => x.id === id);
        if (comment && !comment.isShowSubComment) {
            Vue.set(comment, 'isShowSubComment', true)
        }
    }

    handleClickBrowsePhoto() {
        const upload = this.$refs.upload as any;
        upload.click();
    }

    onChangeDocuments(pics) {
        if (pics.length > 0) {
            this.processUploadDocuments(pics[0]);
        }
    }

    processUploadDocuments(file) {
        this.isUploading = true;
        this.reset();
        if (this.validateFileExtention(file.name)) {
            this.uploadMediaType = 'image'
        } else {
            this.uploadMediaType = 'video'
        }
        this.uploadVideo({
            Data: file,
            FileName: `${new Date().getTime()}_${file.name}`,
        });
    }

    uploadVideo(document) {
        this.uploadedDocs = document;
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
        let method = 'upload';
        if (this.uploadMediaType === 'video') {
            method = 'uploadVideoSocial'
        }
        this.uploadservice[method](formData, config).then(response => {
            this.isUploading = false;
            this.toBase64(document.Data);
            this.progress = 0;
            this.onloadedDocument(response);
        }).catch(err => {
            this.isUploading = false;
            console.error(err);
        });
    }

    onloadedDocument(url) {
        if (this.uploadMediaType === 'video') {
            this.preview = { url: url[3], type: 'video' }; // 1: IOS m3u8; 3: Web + android: mpd
        } else {
            this.preview = { url: url, type: 'image' };
        }
        
    }

    private toBase64(file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            this.uploadResult = this.uploadMediaType === 'image' ? reader.result : 'https://weatherstoragevn.blob.core.windows.net/static-photo/video.jpg';
        };
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

    buildUploadDocumentParams(document) {
        const formData = new FormData();
        formData.append('file', document.Data, document.FileName);
        return formData;
    }

    reset() {
        this.uploadedDocs = null;
        this.progress = 0;
        this.uploadResult = null;
        this.newComment = null;
        this.preview = null;
    }

    handlePreview(data = null) {
        if (data) {
            this.$emit('preview', { index: 0, medias: data.medias })
            return;
        }
        this.$emit('preview', { index: 0, medias: [this.preview] })
    }

    handlePostComment() {
        const comment = new Comment({
            postId: this.subComment ? this.postId : this.id,
            content: this.newComment,
            parentCommentId: this.subComment ? this.id : undefined,
            imageUrls: this.preview && this.preview.type === 'image' ? [this.preview.url] : [],
            videoUrls: this.preview && this.preview.type === 'video' ? [this.preview.url] : [],
        });
        if (!!this.newComment && this.newComment.trim() !== "") {
            this.service.createComment(comment)
                .then(res => {
                    this.$toast.success('Đăng bình luận thành công.Bình luận đang được xét duyệt.');
                    this.reset();
                }).catch(err => {
                    this.$toast.error('Có lỗi khi bình luận');
                    console.log(err);
                })
        } else {
            this.$toast.error('Vui lòng nhập nội dung bình luận.');
        }
    }

    fetchData() {
        this.isLoading = true;
        let method = 'getListCommentsByPost';
        if (this.subComment) {
            method = 'getListSubComments'
        }
        this.service[method](this.searchParam.limit, this.searchParam.page, this.id)
            .then((res: any) => {
                this.commentList = this.subComment ? this.commentList.concat(res.items) : this.commentList.concat(res.comments);
                this.totalPages = res.totalPages;
                this.isLoading = false;
            }).catch(err => {
                this.isLoading = false;
            })
    }

    mounted() {
        this.fetchData();
    }
}