import Vue from 'vue';
import Component from 'vue-class-component';


@Component({
    template: require("./template.html").default,
    components: {}
})
export default class ElevationComponent extends Vue {
    value: number = 0;

    elevation:any = [
        { label: "0m", value: 0, data: "surface"},
        { label: "100m", value: 1, data: "975h"},
        { label: "600m", value: 2, data: "950h"},
        { label: "750m", value: 3, data: "925h"},
        { label: "900m", value: 4, data: "900h"},
        { label: "1500m", value: 5, data: "850h"},
        { label: "2000m", value: 6, data: "800h"},
        { label: "3000m", value: 7, data: "700h"},
        { label: "4200m", value: 8, data: "600h"},
        { label: "5500m", value: 9, data: "500h"},
        { label: "7000m", value: 10, data: "400h"},
        { label: "9000m", value: 11, data: "300h"},
        { label: "10km", value: 12, data: "250h"},
    ]

    getDisplayElevation(value) {
        return this.elevation.find(x => x.value === value).label
    }

    handleChangeLevel(value) {
        this.$emit('input', value);
        const data = this.elevation.find(x => x.value === value)
        this.$emit('change', data.data);
    }
}
