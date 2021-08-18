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

    //https://weatherstoragevn.blob.core.windows.net/images/3423d5c2-5e00-4333-9c31-a36b917251411622019377813_Mask Group 4.jpg
    sampleImages_1: any = ["https://weatherstoragevn.blob.core.windows.net/images/3423d5c2-5e00-4333-9c31-a36b917251411622019377813_Mask Group 4.jpg",
        "https://weatherstoragevn.blob.core.windows.net/file/sample-video/download (3).jpg",
        "https://weatherstoragevn.blob.core.windows.net/file/sample-video/the-last-of-us-part-ii-duality-artwork-light-desktop-image-block-01-ps4-06feb20-en-us.jpg"
    ];
    //https://weatherstoragevn.blob.core.windows.net/file/sample-video/oceans.mp4
    samnpleVideos_1: any = ["https://createvideo-aase.streaming.media.azure.net/9985d049-b48a-43ae-9fb1-9ba4a2555227/ignite.ism/manifest", "https://amssamples.streaming.mediaservices.windows.net/622b189f-ec39-43f2-93a2-201ac4e31ce1/BigBuckBunny.ism/manifest"];

    sampleImages_2: any = ["https://weatherstoragevn.blob.core.windows.net/file/sample-video/download (3).jpg",
        "https://weatherstoragevn.blob.core.windows.net/file/sample-video/the-last-of-us-part-ii-duality-artwork-light-desktop-image-block-01-ps4-06feb20-en-us.jpg"
    ];
    //https://weatherstoragevn.blob.core.windows.net/file/sample-video/oceans.mp4
    samnpleVideos_2: any = ["https://amssamples.streaming.mediaservices.windows.net/622b189f-ec39-43f2-93a2-201ac4e31ce1/BigBuckBunny.ism/manifest"];
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
}