import Vue from "vue";
import Component from "vue-class-component";


@Component({
    template: require("./template.html").default,
    components: {}
})
export default class LocationComponent extends Vue {
    isActive: Number = 0;
    get locations() {
        return [
            {
                lat: 16.06778,
                lon: 108.22083,
                name: "Toàn Quốc",
                zoom: 6
            },
            {
                lat: 10.82302,
                lon: 106.62965,
                name: "Nam Bộ",
                zoom: 7
            },
            {
                lat: 10.25369,
                lon: 105.9722,
                name: "Vĩnh Long",
                zoom: 11
            },
            {
                lat: 21.0245,
                lon: 105.84117,
                name: "Hà Nội",
                zoom: 11
            },
            {
                lat: 10.82302,
                lon: 106.62965,
                name: "TP.HCM",
                zoom: 11
            }
        ];
    }

    handleClick(index) {
        this.isActive = index;
        const mapLocation = this.locations[index];
        this.$emit("change-map", mapLocation);
    }
}
