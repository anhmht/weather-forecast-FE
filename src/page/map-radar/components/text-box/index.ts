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
        await sleep(textbox.time, clear);
        this.renderData.push({
            ...textbox,
            class: `animate__zoomIn ${textbox.position}`
        });
        await sleep(textbox.duration, clear);
        
        const index = this.renderData.findIndex(x => x.id === textbox.id);
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