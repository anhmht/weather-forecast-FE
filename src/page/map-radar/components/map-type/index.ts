import Vue from "vue";
import Component from "vue-class-component";


@Component({
    template: require("./template.html").default,
    components: {}
})
export default class MapTypeComponent extends Vue {
    isActive: Number = 0;
    get mapTypes() {
        return [
            {
                type: "wind",
                name: "Tốc độ gió"
            },
            {
                type: "rain",
                name: "Lượng mưa"
            },
            {
                type: "clouds",
                name: "Lượng mây"
            },
            {
                type: "pressure",
                name: "Áp Lực không khí"
            },
            {
                type: "temp",
                name: "Nhiệt độ"
            },
            {
                type: "currents",
                name: "Dòng nước"
            },
            {
                type: "waves",
                name: "Dải sóng"
            }
        ];
    }

    handleClick(index) {
        this.isActive = index;
        const type = this.mapTypes[index];
        this.$emit("change-map", type);
    }
}
