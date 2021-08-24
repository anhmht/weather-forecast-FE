import Vue from "vue";
import Component from "vue-class-component";

@Component({
    template: require("./template.html").default
})
export default class EmojiPickerComponent extends Vue {
    emojiData = require("./emoji.js").default.data;

    search: string = "";
    tab = null;

    get emojis () {
        return this.emojiData || [];
    }

    get groupEmojiName () {
        let groups = this.emojis.map(e => e.group);
        return groups.filter((e, i) => groups.indexOf(e) === i);
    }

    get groupEmojiTabs () {
        let groupInfo = [];

        this.groupEmojiName.forEach(g => {
            let gr = this.emojis.find(e => e.group === g);
            if (gr) {
                groupInfo.push(gr);
            }
        });

        console.log("emoji-group", groupInfo);
        return groupInfo;
    }

    get groupOfItems () {
        const self =this;
        let items = [];
        
        this.groupEmojiName.forEach((g: string) => {
            let grs = self.emojis.filter(e => {
                if (this.search === '' || this.search == null) {
                    return e.group === g;
                } else {
                    return e.group === g && e.name.toLowerCase().includes(this.search.toLowerCase())
                }
            });
            if (grs && grs.length > 0) {
                items.push({
                    name: self.convertGroupName(g),
                    src: grs
                });
            }
        });

        return items;
    }

    convertGroupName (name: string) {
        return (name || '').toLowerCase().split(' ').join('_');
    }

    handleClickOnEmoji (val) {
        this.$emit('insert-emoji', val);
    }

    mounted () {
    }
}
