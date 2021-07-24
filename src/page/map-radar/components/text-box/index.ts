import Component from "vue-class-component";
import Vue from 'vue';
import { sleep } from "@/utils/common-utils";

@Component({
    template: require("./template.html").default,
    components: {}
})
export default class TextBoxComponent extends Vue {
    renderData: any = [];

    async handleRenderTextBox(textbox) {
        let clear = { timeout: null };
        await sleep(textbox.startTime, clear);
        this.renderData.push({
            ...textbox,
            class: `animate__zoomIn ${textbox.position}`,
            style: textbox.customPosition ? `left: ${textbox.left}px; top: ${textbox.top}px; width:${textbox.width}px; transform: none; right: unset; bottom: unset`: ``
        });
        let index = this.renderData.findIndex(x => x.id === textbox.id);
        if (index > -1) {
            setTimeout(() => {
                this.renderData[index].class = `${textbox.position}`
            }, 500);
        }
        await sleep(textbox.duration, clear);
        index = this.renderData.findIndex(x => x.id === textbox.id);
        if (index > -1) {
            this.renderData[index].class = `animate__zoomOut ${textbox.position}`

            setTimeout(() => {
                this.renderData.splice(index, 1);
            }, 500);
        }
    }

    getContent(content) {
        return content.split('\n').join('<br/>');
    }
}
