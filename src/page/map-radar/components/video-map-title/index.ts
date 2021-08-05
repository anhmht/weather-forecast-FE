import { sleep } from './../../../../utils/common-utils';
import Vue from 'vue';
import Component from 'vue-class-component';


@Component({
    template: require("./template.html").default,
    components: {}
})
export default class VideoMapTitleComponent extends Vue {
    title: any = {};
    isReset: boolean = false;
    clearTimeout: any = {
        timeout: null,
    }

    async renderMapTitle(title) {
        this.isReset = true;
        await sleep(title.startTime, this.clearTimeout);
        if (!this.isReset) {
            return;
        }
        title.class = `animate__zoomIn ${title.position}`
        title.style = title.customPosition ? `left: ${title.left}px; top: ${title.top}px; width:${title.width}px; transform: none; right: unset; bottom: unset` : ``
        this.title = title;
        if (!this.isReset) {
            return;
        }
        await sleep(title.duration, this.clearTimeout);
        this.title = {
            ...this.title,
            class: `animate__zoomOut ${title.position}`
        }
        if (!this.isReset) {
            return;
        }
        setTimeout(() => {
            this.title = {}
        }, 1000);
    }

    clearData() {
        clearTimeout(this.clearTimeout.timeout);
        this.title = {};
        this.isReset = false;
    }

    getContent(content) {
        return content.split('\n').join('<br/>');
    }
}
