import { ISocialPost } from '@/model/post';
import { SocialServices } from '@/service/social-service/social.service';
import { DataHelper } from '@/utils/data-helper';
import Vue from 'vue';
import Component from 'vue-class-component';

@Component({
    template: require("./template.html").default,
    components: {
        "preview-image": () => import("../../../../components/preview-image/PreviewImage.vue"),
        "media-layout": () => import("../../../../components/media-layout/MediaLayoutComponent.vue"),
        "comment": () => import("../../../../components/comment/CommentComponent.vue"),
        "reaction": () => import("../../../../components/reaction/ReactionComponent.vue")
    },
})
export default class ListStatusComponent extends Vue {

    service: SocialServices = new SocialServices();
    searchParam = {
        limit: 2,
        page: 1
    }

    socialPost: ISocialPost[] = []
    isReadMore: boolean = false;

    isLoading: boolean = false;
    totalPages: number = 0;
    attrs: any = {
        class: 'mb-6',
        boilerplate: true,
        elevation: 2,
    }

    //https://weatherstoragevn.blob.core.windows.net/images/3423d5c2-5e00-4333-9c31-a36b917251411622019377813_Mask Group 4.jpg
    // sampleImages_1: any = ["https://weatherstoragevn.blob.core.windows.net/images/3423d5c2-5e00-4333-9c31-a36b917251411622019377813_Mask Group 4.jpg",
    //     "https://weatherstoragevn.blob.core.windows.net/file/sample-video/download (3).jpg",
    //     "https://weatherstoragevn.blob.core.windows.net/file/sample-video/the-last-of-us-part-ii-duality-artwork-light-desktop-image-block-01-ps4-06feb20-en-us.jpg"
    // ];
    //https://weatherstoragevn.blob.core.windows.net/file/sample-video/oceans.mp4
    // samnpleVideos_1: any = ["https://createvideo-aase.streaming.media.azure.net/9985d049-b48a-43ae-9fb1-9ba4a2555227/ignite.ism/manifest", "https://amssamples.streaming.mediaservices.windows.net/622b189f-ec39-43f2-93a2-201ac4e31ce1/BigBuckBunny.ism/manifest"];

    // sampleImages_2: any = ["https://weatherstoragevn.blob.core.windows.net/file/sample-video/download (3).jpg",
    //     "https://weatherstoragevn.blob.core.windows.net/file/sample-video/the-last-of-us-part-ii-duality-artwork-light-desktop-image-block-01-ps4-06feb20-en-us.jpg"
    // ];
    //https://weatherstoragevn.blob.core.windows.net/file/sample-video/oceans.mp4
    // samnpleVideos_2: any = ["https://amssamples.streaming.mediaservices.windows.net/622b189f-ec39-43f2-93a2-201ac4e31ce1/BigBuckBunny.ism/manifest"];
    isPreivew: boolean = false;
    selectedItem: any = [];
    selectedIndex: number = 0;

    getColor(name) {
        return DataHelper.generateColorByString(name);
    }

    handlePreview(data) {
        this.selectedItem = data.medias;
        this.selectedIndex = data.index;
        this.isPreivew = true;
    }

    toggleContent(event) {
        this.isReadMore = !this.isReadMore;
    }

    fetchData() {
        this.isLoading = true;
        this.service.getListPosts(this.searchParam.limit, this.searchParam.page, 0)
            .then((res: any) => {
                this.socialPost = this.socialPost.concat(res.posts);
                this.totalPages = res.totalPages;
                this.isLoading = false;
            }).catch(err => {
                this.isLoading = false;
            })
    }

    loadMorePost() {
        window.addEventListener('scroll', () => {
            const {
                scrollTop,
                scrollHeight,
                clientHeight
            } = document.documentElement;

            if (scrollTop + clientHeight >= scrollHeight - 5 && !this.isLoading) {
                if (this.searchParam.page < this.totalPages) {
                    this.searchParam.page += 1;
                    this.fetchData();
                }
            }
        }, { passive: true });
    }

    mounted() {
        this.fetchData();
        this.loadMorePost();
    }

}