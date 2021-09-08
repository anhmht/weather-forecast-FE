import Component from "vue-class-component";
import Vue from "vue";
import { DataHelper } from "@/utils/data-helper";
import { storeModules } from "@/store";
import lookupTypesStore, { GeneralLookupTypes } from "@/store/lookup/lookup-types.store";
import { Getter, namespace } from "vuex-class";
import { SocialServices } from "@/service/social-service/social.service";

const LookupGetter = namespace(storeModules.Lookup, Getter);

@Component({
    template: require("./template.html").default,
    components: {
        "preview-image": () => import("../../../../../components/preview-image/PreviewImage.vue"),
    }
})
export default class MyCommentComponent extends Vue {
    myComments: any = [];
    isLoading: boolean = false;
    totalPages: number = 0;
    searchParam = {
        limit: 5,
        page: 1
    };
    attrs: any = {
        class: "mb-6",
        boilerplate: true,
        elevation: 2
    };
    isPreview: boolean = false;
    selectedItem: any = [];
    selectedIndex: number = 0;
    socialService: SocialServices = new SocialServices();

    getColor(name) {
        return DataHelper.generateColorByString(name);
    }

    @LookupGetter(lookupTypesStore.Get.LOOKUP_DATA) dtoLookupData: Object;

    get lookupPostStatus () {
        return this.dtoLookupData[GeneralLookupTypes.POST_STATUS] || [];
    }

    getStatus(statusId) {
        let status = this.lookupPostStatus.find(e => e.valueId === statusId);
        return status ? status.description : "";
    }

    displayContent(content) {
        if (content.length >= 255) {
            return `${content.substring(0, 254)}...`.split('\n').join('<br/>');
        } else if (content.split(/\r\n|\r|\n/).length >= 4) {
            return content.split(/\r\n|\r|\n/, 3).join('<br/>');
        }

        return content.split('\n').join('<br/>');
    }

    toggleContent(target, item) {
        if (target.innerText === "Đọc thêm") {
            target.parentElement.firstElementChild.innerText = item.content;
            target.innerText = "Rút gọn";
        } else if (target.innerText === "Rút gọn") {
            target.parentElement.firstElementChild.innerHTML = this.displayContent(item.content);
            target.innerText = "Đọc thêm";
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

    handlePreview(data) {
        this.selectedItem = data.medias;
        this.selectedIndex = data.index;
        this.isPreview = true;
    }

    previewData(comment) {
        const src = comment.listImageUrl.concat(comment.listVideoUrl);
        const url = src[0];
        if (this.validateFileExtention(url)) {
            return { medias: [{ url, type: 'image' }] };
        } else {
            return { medias: [{ url, type: 'video' }] };// 1: IOS m3u8; 3: Web + android: mpd
        }
    }

    getMediaSrc(comment) {
        const src = comment.listImageUrl.concat(comment.listVideoUrl)
        const url = src[0];
        if (this.validateFileExtention(url)) {
            return url;
        } else {
            return 'https://weatherstoragevn.blob.core.windows.net/static-photo/video.jpg';
        }
    }

    loadMorePost() {
        window.addEventListener('scroll', () => {
            const {
                scrollTop,
                scrollHeight,
                clientHeight
            } = document.documentElement;

            if (scrollTop + clientHeight >= scrollHeight - 50 && !this.isLoading) {
                if (this.searchParam.page < this.totalPages) {
                    this.searchParam.page += 1;
                    this.fetchData();
                }
            }
        }, { passive: true });
    }

    fetchData() {
        this.isLoading = true;
        this.socialService
            .getListCommentsUser(this.searchParam.limit, this.searchParam.page)
            .then((res: any) => {
                this.myComments = this.myComments.concat(res.items);
                this.totalPages = res.totalPages;
                this.isLoading = false;
            })
            .catch(error => {
                this.$errorMessage(error);
                this.isLoading = false;
            });
    }

    mounted() {
        this.fetchData();
        this.loadMorePost();
    }
}
