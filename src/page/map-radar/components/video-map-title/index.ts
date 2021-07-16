import { sleep } from './../../../../utils/common-utils';
import Vue from 'vue';
import Component from 'vue-class-component';


@Component({
    template: require("./template.html").default,
    components: {}
})
export default class VideoMapTitleComponent extends Vue {
    title: any = {};

    async renderMapTitle(title) {
        let clear = { timeout: null };
        await sleep(title.startTime, clear);
        title.class = `animate__zoomIn ${title.position}`
        title.style = title.customPosition ? `left: ${title.left}px; top: ${title.top}px; width:${title.width}px; transform: none; right: unset; bottom: unset` : ``
        this.title = title;
        await sleep(title.duration, clear);
        this.title = {
            ...this.title,
            class: `animate__zoomOut ${title.position}`
        }
        setTimeout(() => {
            this.title = {}
        }, 1000);
    }

    getContent(content) {
        return content.split('\n').join('<br/>');
    }
}
