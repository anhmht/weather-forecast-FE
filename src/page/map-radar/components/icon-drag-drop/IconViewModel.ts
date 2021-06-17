
import { ICON } from "@/constant/icon-constant";
import { Vue } from "vue-property-decorator";

export default class IconDragDropViewModel extends Vue {
    listIcon = ICON.map(x => {
        return {
            name: `icon_${x.id}`,
            class: `icon_${x.id}`,
            src: x.url
        }
    })
}
