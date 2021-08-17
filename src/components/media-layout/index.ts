
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
        const number = this.images.length + this.videos.length;
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
        console.log(result);
        
        return result;
    }

    handlePreview(index) {
        this.$emit('preview', {index, medias: this.Medias})
    }

}