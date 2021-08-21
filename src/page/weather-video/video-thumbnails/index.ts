import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";
import NO_IMAGE from '../../../../static/img/no-image/no-image.png';

@Component({
    template: require("./template.html").default,
})

export default class VideoThumbnailsComponent extends Vue {
    @Prop({ required: true, default: null})
    url: string

    @Prop({ required: false, default: 'small'})
    size: string

    get defaultImg () {
        return NO_IMAGE;
    }

    getThumb () {
        /** 
            Width | Height | URL
            ------|--------|----
            120   | 90     | https://i.ytimg.com/vi/<VIDEO ID>/1.jpg
            120   | 90     | https://i.ytimg.com/vi/<VIDEO ID>/2.jpg
            120   | 90     | https://i.ytimg.com/vi/<VIDEO ID>/3.jpg
            120   | 90     | https://i.ytimg.com/vi/<VIDEO ID>/default.jpg
            320   | 180    | https://i.ytimg.com/vi/<VIDEO ID>/mq1.jpg
            320   | 180    | https://i.ytimg.com/vi/<VIDEO ID>/mq2.jpg
            320   | 180    | https://i.ytimg.com/vi/<VIDEO ID>/mq3.jpg
            320   | 180    | https://i.ytimg.com/vi/<VIDEO ID>/mqdefault.jpg
            480   | 360    | https://i.ytimg.com/vi/<VIDEO ID>/0.jpg
            480   | 360    | https://i.ytimg.com/vi/<VIDEO ID>/hq1.jpg
            480   | 360    | https://i.ytimg.com/vi/<VIDEO ID>/hq2.jpg
            480   | 360    | https://i.ytimg.com/vi/<VIDEO ID>/hq3.jpg
            480   | 360    | https://i.ytimg.com/vi/<VIDEO ID>/hqdefault.jpg
            640   | 480    | https://i.ytimg.com/vi/<VIDEO ID>/sd1.jpg
            640   | 480    | https://i.ytimg.com/vi/<VIDEO ID>/sd2.jpg
            640   | 480    | https://i.ytimg.com/vi/<VIDEO ID>/sd3.jpg
            640   | 480    | https://i.ytimg.com/vi/<VIDEO ID>/sddefault.jpg
            1280  | 720    | https://i.ytimg.com/vi/<VIDEO ID>/hq720.jpg
            1920  | 1080   | https://i.ytimg.com/vi/<VIDEO ID>/maxresdefault.jpg
        */

        if (this.url && this.url !== '') {
            let quality = '';
            switch (this.size) {
                case 'large':
                    quality = "https://img.youtube.com/vi/[youtube-id]/hq720.jpg"
                    break;
                case 'medium':
                    quality = "https://img.youtube.com/vi/[youtube-id]/hqdefault.jpg"
                    break;
                default:
                    quality = "https://img.youtube.com/vi/[youtube-id]/mqdefault.jpg"
                    break;
            }
            
            const id = this.url.match(/youtube\.com.*(\?v=|\/embed\/)(.{11})/).pop();
            if (id.length == 11) {
                return quality.replace('[youtube-id]', id);
            }
        }

        return null;
    }

    onImgError (event) {
        event.target.src = NO_IMAGE;
    }

    mounted () {
    }

}
