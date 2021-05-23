import { DataHelper } from "@/utils/data-helper";
import Vue from "vue";
import Component from "vue-class-component";

@Component({
    template: require("./template.html").default,
    components: {}
})
export default class LocationComponent extends Vue {
    isActive: Number = 0;
    vinhlong = null;
    get locations() {
        return [
            {
                lat: 16.06778,
                lon: 108.22083,
                name: "Toàn Quốc",
                zoom: 6
            },
            {
                lat: 10.25369,
                lon: 105.9722,
                name: "Vĩnh Long",
                zoom: 12,
                placeId: 'ChIJR8ONdLqCCjERJ00Xm4aX9fQ',
                geojson: 'vinh_long',
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
                geojson: 'ha_noi',
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
                geojson: 'ho_chi_minh_city',
                style: {
                    color: "#ff7800",
                    weight: 3,
                    opacity: 0.5
                }
            },
            {
                name: "An Giang",
                zoom: 12,
                geojson: 'an_giang',
                style: {
                    color: "#ff7800",
                    weight: 3,
                    opacity: 0.5
                }
            },
            {
                name: "Bà Rịa – Vũng Tàu",
                zoom: 12,
                geojson: 'ba_ria_vung_tau',
                style: {
                    color: "#ff7800",
                    weight: 3,
                    opacity: 0.5
                }
            },
            {
                name: "Bắc Giang",
                zoom: 12,
                geojson: 'bac_giang',
                style: {
                    color: "#ff7800",
                    weight: 3,
                    opacity: 0.5
                }
            },
            {
                name: "Bắc Kạn",
                zoom: 12,
                geojson: 'bac_kan',
                style: {
                    color: "#ff7800",
                    weight: 3,
                    opacity: 0.5
                }
            },
            {
                name: "Bạc Liêu",
                zoom: 12,
                geojson: 'bac_lieu',
                style: {
                    color: "#ff7800",
                    weight: 3,
                    opacity: 0.5
                }
            },
            {
                name: "Bắc Ninh",
                zoom: 12,
                geojson: 'bac_ninh',
                style: {
                    color: "#ff7800",
                    weight: 3,
                    opacity: 0.5
                }
            },
            {
                name: "Bến Tre",
                zoom: 12,
                geojson: 'ben_tre',
                style: {
                    color: "#ff7800",
                    weight: 3,
                    opacity: 0.5
                }
            },
            {
                name: "Bình Định",
                zoom: 12,
                geojson: 'binh_dinh',
                style: {
                    color: "#ff7800",
                    weight: 3,
                    opacity: 0.5
                }
            },
            {
                name: "Bình Dương",
                zoom: 12,
                geojson: 'binh_duong',
                style: {
                    color: "#ff7800",
                    weight: 3,
                    opacity: 0.5
                }
            },
            {
                name: "Bình Phước",
                zoom: 12,
                geojson: 'binh_phuoc',
                style: {
                    color: "#ff7800",
                    weight: 3,
                    opacity: 0.5
                }
            },
            {
                name: "Bình Thuận",
                zoom: 12,
                geojson: 'binh_thuan',
                style: {
                    color: "#ff7800",
                    weight: 3,
                    opacity: 0.5
                }
            },
            {
                name: "Cà Mau",
                zoom: 12,
                geojson: 'ca_mau',
                style: {
                    color: "#ff7800",
                    weight: 3,
                    opacity: 0.5
                }
            },
            {
                name: "Cần Thơ",
                zoom: 12,
                geojson: 'can_tho',
                style: {
                    color: "#ff7800",
                    weight: 3,
                    opacity: 0.5
                }
            },
            {
                name: "Cao Bằng",
                zoom: 12,
                geojson: 'cao_bang',
                style: {
                    color: "#ff7800",
                    weight: 3,
                    opacity: 0.5
                }
            },
            {
                name: "Đà Nẵng",
                zoom: 12,
                geojson: 'da_nang',
                style: {
                    color: "#ff7800",
                    weight: 3,
                    opacity: 0.5
                }
            },
            {
                name: "Đắk Lắk",
                zoom: 12,
                geojson: 'dak_lak',
                style: {
                    color: "#ff7800",
                    weight: 3,
                    opacity: 0.5
                }
            },
            {
                name: "Đắk Nông",
                zoom: 12,
                geojson: 'dak_nong',
                style: {
                    color: "#ff7800",
                    weight: 3,
                    opacity: 0.5
                }
            },
            {
                name: "Điện Biên",
                zoom: 12,
                geojson: 'dien_bien',
                style: {
                    color: "#ff7800",
                    weight: 3,
                    opacity: 0.5
                }
            },
            {
                name: "Đồng Nai",
                zoom: 12,
                geojson: 'dong_nai',
                style: {
                    color: "#ff7800",
                    weight: 3,
                    opacity: 0.5
                }
            },
            {
                name: "Đồng Tháp",
                zoom: 12,
                geojson: 'dong_thap',
                style: {
                    color: "#ff7800",
                    weight: 3,
                    opacity: 0.5
                }
            },
            {
                name: "Gia Lai",
                zoom: 12,
                geojson: 'gia_lai',
                style: {
                    color: "#ff7800",
                    weight: 3,
                    opacity: 0.5
                }
            },
            {
                name: "Hà Giang",
                zoom: 12,
                geojson: 'ha_giang',
                style: {
                    color: "#ff7800",
                    weight: 3,
                    opacity: 0.5
                }
            },
            {
                name: "Hà Nam",
                zoom: 12,
                geojson: 'ha_nam',
                style: {
                    color: "#ff7800",
                    weight: 3,
                    opacity: 0.5
                }
            },
            {
                name: "Hà Tĩnh",
                zoom: 12,
                geojson: 'ha_tinh',
                style: {
                    color: "#ff7800",
                    weight: 3,
                    opacity: 0.5
                }
            },
            {
                name: "Hải Dương",
                zoom: 12,
                geojson: 'hai_duong',
                style: {
                    color: "#ff7800",
                    weight: 3,
                    opacity: 0.5
                }
            },
            {
                name: "Hải Phòng",
                zoom: 12,
                geojson: 'hai_phong',
                style: {
                    color: "#ff7800",
                    weight: 3,
                    opacity: 0.5
                }
            },
            {
                name: "Hậu Giang",
                zoom: 12,
                geojson: 'hau_giang',
                style: {
                    color: "#ff7800",
                    weight: 3,
                    opacity: 0.5
                }
            },
            {
                name: "Hòa Bình",
                zoom: 12,
                geojson: 'hoa_binh',
                style: {
                    color: "#ff7800",
                    weight: 3,
                    opacity: 0.5
                }
            },
            {
                name: "Hưng Yên",
                zoom: 12,
                geojson: 'hung_yen',
                style: {
                    color: "#ff7800",
                    weight: 3,
                    opacity: 0.5
                }
            },
            {
                name: "Khánh Hòa",
                zoom: 12,
                geojson: 'khanh_hoa',
                style: {
                    color: "#ff7800",
                    weight: 3,
                    opacity: 0.5
                }
            },
            {
                name: "Kiên Giang",
                zoom: 12,
                geojson: 'kien_giang',
                style: {
                    color: "#ff7800",
                    weight: 3,
                    opacity: 0.5
                }
            },
            {
                name: "Kon Tum",
                zoom: 12,
                geojson: 'kon_tum',
                style: {
                    color: "#ff7800",
                    weight: 3,
                    opacity: 0.5
                }
            },
            {
                name: "Lai Châu",
                zoom: 12,
                geojson: 'lai_chau',
                style: {
                    color: "#ff7800",
                    weight: 3,
                    opacity: 0.5
                }
            },
            {
                name: "Lâm Đồng",
                zoom: 12,
                geojson: 'lam_dong',
                style: {
                    color: "#ff7800",
                    weight: 3,
                    opacity: 0.5
                }
            },
            {
                name: "Lạng Sơn",
                zoom: 12,
                geojson: 'lang_son',
                style: {
                    color: "#ff7800",
                    weight: 3,
                    opacity: 0.5
                }
            },
            {
                name: "Lào Cai",
                zoom: 12,
                geojson: 'lao_cai',
                style: {
                    color: "#ff7800",
                    weight: 3,
                    opacity: 0.5
                }
            },
            {
                name: "Long An",
                zoom: 12,
                geojson: 'long_an',
                style: {
                    color: "#ff7800",
                    weight: 3,
                    opacity: 0.5
                }
            },
            {
                name: "Nam Định",
                zoom: 12,
                geojson: 'nam_dinh',
                style: {
                    color: "#ff7800",
                    weight: 3,
                    opacity: 0.5
                }
            },
            {
                name: "Nghệ An",
                zoom: 12,
                geojson: 'nghe_an',
                style: {
                    color: "#ff7800",
                    weight: 3,
                    opacity: 0.5
                }
            },
            {
                name: "Ninh Bình",
                zoom: 12,
                geojson: 'ninh_binh',
                style: {
                    color: "#ff7800",
                    weight: 3,
                    opacity: 0.5
                }
            },
            {
                name: "Ninh Thuận",
                zoom: 12,
                geojson: 'ninh_thuan',
                style: {
                    color: "#ff7800",
                    weight: 3,
                    opacity: 0.5
                }
            },
            {
                name: "Phú Thọ",
                zoom: 12,
                geojson: 'phu_tho',
                style: {
                    color: "#ff7800",
                    weight: 3,
                    opacity: 0.5
                }
            },
            {
                name: "Phú Yên",
                zoom: 12,
                geojson: 'phu_yen',
                style: {
                    color: "#ff7800",
                    weight: 3,
                    opacity: 0.5
                }
            },
            {
                name: "Quảng Bình",
                zoom: 12,
                geojson: 'quang_binh',
                style: {
                    color: "#ff7800",
                    weight: 3,
                    opacity: 0.5
                }
            },
            {
                name: "Quảng Nam",
                zoom: 12,
                geojson: 'quang_nam',
                style: {
                    color: "#ff7800",
                    weight: 3,
                    opacity: 0.5
                }
            },
            {
                name: "Quảng Ngãi",
                zoom: 12,
                geojson: 'quang_ngai',
                style: {
                    color: "#ff7800",
                    weight: 3,
                    opacity: 0.5
                }
            },
            {
                name: "Quảng Ninh",
                zoom: 12,
                geojson: 'quang_ninh',
                style: {
                    color: "#ff7800",
                    weight: 3,
                    opacity: 0.5
                }
            },
            {
                name: "Quảng Trị",
                zoom: 12,
                geojson: 'quang_tri',
                style: {
                    color: "#ff7800",
                    weight: 3,
                    opacity: 0.5
                }
            },
            {
                name: "Sóc Trăng",
                zoom: 12,
                geojson: 'soc_trang',
                style: {
                    color: "#ff7800",
                    weight: 3,
                    opacity: 0.5
                }
            },
            {
                name: "Sơn La",
                zoom: 12,
                geojson: 'son_la',
                style: {
                    color: "#ff7800",
                    weight: 3,
                    opacity: 0.5
                }
            },
            {
                name: "Tây Ninh",
                zoom: 12,
                geojson: 'tay_ninh',
                style: {
                    color: "#ff7800",
                    weight: 3,
                    opacity: 0.5
                }
            },
            {
                name: "Thái Bình",
                zoom: 12,
                geojson: 'thai_binh',
                style: {
                    color: "#ff7800",
                    weight: 3,
                    opacity: 0.5
                }
            },
            {
                name: "Thái Nguyên",
                zoom: 12,
                geojson: 'thai_nguyen',
                style: {
                    color: "#ff7800",
                    weight: 3,
                    opacity: 0.5
                }
            },
            {
                name: "Thanh Hóa",
                zoom: 12,
                geojson: 'thanh_hoa',
                style: {
                    color: "#ff7800",
                    weight: 3,
                    opacity: 0.5
                }
            },
            {
                name: "Thừa Thiên Huế",
                zoom: 12,
                geojson: 'thua_thien_hue',
                style: {
                    color: "#ff7800",
                    weight: 3,
                    opacity: 0.5
                }
            },
            {
                name: "Tiền Giang",
                zoom: 12,
                geojson: 'tien_giang',
                style: {
                    color: "#ff7800",
                    weight: 3,
                    opacity: 0.5
                }
            },
            {
                name: "Trà Vinh",
                zoom: 12,
                geojson: 'tra_vinh',
                style: {
                    color: "#ff7800",
                    weight: 3,
                    opacity: 0.5
                }
            },
            {
                name: "Tuyên Quang",
                zoom: 12,
                geojson: 'tuyen_quang',
                style: {
                    color: "#ff7800",
                    weight: 3,
                    opacity: 0.5
                }
            },
            {
                name: "Vĩnh Phúc",
                zoom: 12,
                geojson: 'vinh_phuc',
                style: {
                    color: "#ff7800",
                    weight: 3,
                    opacity: 0.5
                }
            },
            {
                name: "Yên Bái",
                zoom: 12,
                geojson: 'yen_bai',
                style: {
                    color: "#ff7800",
                    weight: 3,
                    opacity: 0.5
                }
            }
        ];
    }

    async handleClick(index) {
        this.isActive = index;
        const mapLocation = DataHelper.deepClone(this.locations[index]) as any;
        const geojson = await import(`../../../../asset/geoJson/${mapLocation.geojson}.geojson`);
        mapLocation.geojson = JSON.stringify(geojson);
        this.$emit("change-map", mapLocation);
    }

    async mounted() {

    }
}
