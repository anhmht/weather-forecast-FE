
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';

@Component({
     // template: require("./template.html").default,
    components: {},
    render: function (createElement) {
        if (!this.template) {
            return createElement("span", "Loading...");
        } else {
            return this.template();
        }
    },
    created() {
        if (this.editable === true) {
            this.template = Vue.compile(require("./template_editable.html").default).render;
            return;
        }
        const number = (this.images ? this.images.length : 0) + (this.videos ? this.videos.length : 0);
        console.log(this.videos);
        
        switch (number) {
            case 1:
                this.template = Vue.compile(require("./template_1.html").default).render;
                break;
            case 2:
                this.template = Vue.compile(require("./template_2.html").default).render;
                break;
            case 3:
                this.template = Vue.compile(require("./template_3.html").default).render;
                break;
            case 4:
                this.template = Vue.compile(require("./template_4.html").default).render;
                break;
            default:
                this.template = Vue.compile(require("./template.html").default).render;
                break;
        }
    }
})
export default class MediaLayoutComponent extends Vue {
    @Prop({ type: Array, default: [] })
    images

    @Prop({ type: Array, default:  [] })
    videos

    @Prop( {type: Boolean, default: false})
    editable

    get Medias() {
        let result = []
        const imagesArr = this.images ? this.images.map(x => {
            return {
                type: 'image',
                url: x
            }
        }) : [];
        const videoArr = this.videos ? this.videos.map(x => {
            return {
                type: 'video',
                url: x
            }
        }) : [];
        result = imagesArr.concat(videoArr);
        return result;
    }

    get layoutType () {
        if (this.Medias.length > 4) return 5;
        return this.Medias.length;
    }

    getRatio (index) {
        switch (this.Medias.length) {
            case 1:
                return 9/16
            case 2:
                return 3/2
            case 3:
                if (index == 0) {
                    return 16/9
                } else {
                    return 1
                }
            default:
                if (index == 0) {
                    return 1/2
                } else {
                    return 3/2
                }
        }
    }

    handlePreview(index) {
        this.$emit('preview', {index, medias: this.Medias})
    }

    removeMedia (item) {
        if (!item) return;

        if(item.type == 'image') {
            this.$emit('update:images', this.images.filter(e => e !== item.url));
        } else if (item.type == 'video') {
            this.$emit('update:videos', this.videos.filter(e => e !== item.url));
        }
    }
}