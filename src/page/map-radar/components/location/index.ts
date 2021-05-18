import Vue from "vue";
import Component from "vue-class-component";
import vinh_long from '../../../../asset/geoJson/vinh_long.geojson';
import ho_chi_minh_city from '../../../../asset/geoJson/ho_chi_minh_city.geojson';
import hanoi from '../../../../asset/geoJson/hanoi.geojson';

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
                zoom: 12,
                geojson: JSON.stringify(vinh_long),
                style: {
                    color: "#ff7800",
                    weight: 3,
                    opacity: 0.5
                }
            },
            {
                lat: 21.0245,
                lon: 105.84117,
                name: "Hà Nội",
                zoom: 12,
                geojson: JSON.stringify(hanoi),
                style: {
                    color: "#ff7800",
                    weight: 3,
                    opacity: 0.5
                }
            },
            {
                lat: 10.82302,
                lon: 106.62965,
                name: "TP.HCM",
                zoom: 12,
                geojson: JSON.stringify(ho_chi_minh_city),
                style: {
                    color: "#ff7800",
                    weight: 3,
                    opacity: 0.5
                }
            }
        ];
    }

    handleClick(index) {
        this.isActive = index;
        const mapLocation = this.locations[index];
        this.$emit("change-map", mapLocation);
    }
}
