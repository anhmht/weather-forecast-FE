import Vue from "vue";
import Component from "vue-class-component";
import vinh_long from '../../../../asset/geoJson/vinh_long.geojson';
import ho_chi_minh_city from '../../../../asset/geoJson/ho_chi_minh_city.geojson';
import ha_noi from '../../../../asset/geoJson/ha_noi.geojson';
import an_giang from '../../../../asset/geoJson/an_giang.geojson';
import ba_ria_vung_tau from '../../../../asset/geoJson/ba_ria_vung_tau.geojson';
import bac_giang from '../../../../asset/geoJson/bac_giang.geojson';
import bac_kan from '../../../../asset/geoJson/bac_kan.geojson';
import bac_lieu from '../../../../asset/geoJson/bac_lieu.geojson';
import bac_ninh from '../../../../asset/geoJson/bac_ninh.geojson';
import ben_tre from '../../../../asset/geoJson/ben_tre.geojson';
import binh_dinh from '../../../../asset/geoJson/binh_dinh.geojson';
import binh_duong from '../../../../asset/geoJson/binh_duong.geojson';
import binh_phuoc from '../../../../asset/geoJson/binh_phuoc.geojson';
import binh_thuan from '../../../../asset/geoJson/binh_thuan.geojson';
import ca_mau from '../../../../asset/geoJson/ca_mau.geojson';
import can_tho from '../../../../asset/geoJson/can_tho.geojson';
import cao_bang from '../../../../asset/geoJson/cao_bang.geojson';
import da_nang from '../../../../asset/geoJson/da_nang.geojson';
import dak_lak from '../../../../asset/geoJson/dak_lak.geojson';
import dak_nong from '../../../../asset/geoJson/dak_nong.geojson';
import dien_bien from '../../../../asset/geoJson/dien_bien.geojson';
import dong_nai from '../../../../asset/geoJson/dong_nai.geojson';
import dong_thap from '../../../../asset/geoJson/dong_thap.geojson';
import gia_lai from '../../../../asset/geoJson/gia_lai.geojson';
import ha_giang from '../../../../asset/geoJson/ha_giang.geojson';
import ha_nam from '../../../../asset/geoJson/ha_nam.geojson';
import ha_tinh from '../../../../asset/geoJson/ha_tinh.geojson';
import hai_duong from '../../../../asset/geoJson/hai_duong.geojson';
import hai_phong from '../../../../asset/geoJson/hai_phong.geojson';
import hau_giang from '../../../../asset/geoJson/hau_giang.geojson';
import hoa_binh from '../../../../asset/geoJson/hoa_binh.geojson';
import hung_yen from '../../../../asset/geoJson/hung_yen.geojson';
import khanh_hoa from '../../../../asset/geoJson/khanh_hoa.geojson';
import kien_giang from '../../../../asset/geoJson/kien_giang.geojson';
import kon_tum from '../../../../asset/geoJson/kon_tum.geojson';
import lai_chau from '../../../../asset/geoJson/lai_chau.geojson';
import lam_dong from '../../../../asset/geoJson/lam_dong.geojson';
import lang_son from '../../../../asset/geoJson/lang_son.geojson';
import lao_cai from '../../../../asset/geoJson/lao_cai.geojson';
import long_an from '../../../../asset/geoJson/long_an.geojson';
import nam_dinh from '../../../../asset/geoJson/nam_dinh.geojson';
import nghe_an from '../../../../asset/geoJson/nghe_an.geojson';
import ninh_binh from '../../../../asset/geoJson/ninh_binh.geojson';
import ninh_thuan from '../../../../asset/geoJson/ninh_thuan.geojson';
import phu_tho from '../../../../asset/geoJson/phu_tho.geojson';
import phu_yen from '../../../../asset/geoJson/phu_yen.geojson';
import quang_binh from '../../../../asset/geoJson/quang_binh.geojson';
import quang_nam from '../../../../asset/geoJson/quang_nam.geojson';
import quang_ngai from '../../../../asset/geoJson/quang_ngai.geojson';
import quang_ninh from '../../../../asset/geoJson/quang_ninh.geojson';
import quang_tri from '../../../../asset/geoJson/quang_tri.geojson';
import soc_trang from '../../../../asset/geoJson/soc_trang.geojson';
import son_la from '../../../../asset/geoJson/son_la.geojson';
import tay_ninh from '../../../../asset/geoJson/tay_ninh.geojson';
import thai_binh from '../../../../asset/geoJson/thai_binh.geojson';
import thai_nguyen from '../../../../asset/geoJson/thai_nguyen.geojson';
import thanh_hoa from '../../../../asset/geoJson/thanh_hoa.geojson';
import thua_thien_hue from '../../../../asset/geoJson/thua_thien_hue.geojson';
import tien_giang from '../../../../asset/geoJson/tien_giang.geojson';
import tra_vinh from '../../../../asset/geoJson/tra_vinh.geojson';
import tuyen_quang from '../../../../asset/geoJson/tuyen_quang.geojson';
import vinh_phuc from '../../../../asset/geoJson/vinh_phuc.geojson';
import yen_bai from '../../../../asset/geoJson/yen_bai.geojson';

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
                lat: 10.25369,
                lon: 105.9722,
                name: "Vĩnh Long",
                zoom: 12,
                placeId: 'ChIJR8ONdLqCCjERJ00Xm4aX9fQ',
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
                geojson: JSON.stringify(ha_noi),
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
            },
            {
                name: "An Giang",
                zoom: 12,
                geojson: JSON.stringify(an_giang),
                style: {
                    color: "#ff7800",
                    weight: 3,
                    opacity: 0.5
                }
            },
            {
                name: "Bà Rịa – Vũng Tàu",
                zoom: 12,
                geojson: JSON.stringify(ba_ria_vung_tau),
                style: {
                    color: "#ff7800",
                    weight: 3,
                    opacity: 0.5
                }
            },
            {
                name: "Bắc Giang",
                zoom: 12,
                geojson: JSON.stringify(bac_giang),
                style: {
                    color: "#ff7800",
                    weight: 3,
                    opacity: 0.5
                }
            },
            {
                name: "Bắc Kạn",
                zoom: 12,
                geojson: JSON.stringify(bac_kan),
                style: {
                    color: "#ff7800",
                    weight: 3,
                    opacity: 0.5
                }
            },
            {
                name: "Bạc Liêu",
                zoom: 12,
                geojson: JSON.stringify(bac_lieu),
                style: {
                    color: "#ff7800",
                    weight: 3,
                    opacity: 0.5
                }
            },
            {
                name: "Bắc Ninh",
                zoom: 12,
                geojson: JSON.stringify(bac_ninh),
                style: {
                    color: "#ff7800",
                    weight: 3,
                    opacity: 0.5
                }
            },
            {
                name: "Bến Tre",
                zoom: 12,
                geojson: JSON.stringify(ben_tre),
                style: {
                    color: "#ff7800",
                    weight: 3,
                    opacity: 0.5
                }
            },
            {
                name: "Bình Định",
                zoom: 12,
                geojson: JSON.stringify(binh_dinh),
                style: {
                    color: "#ff7800",
                    weight: 3,
                    opacity: 0.5
                }
            },
            {
                name: "Bình Dương",
                zoom: 12,
                geojson: JSON.stringify(binh_duong),
                style: {
                    color: "#ff7800",
                    weight: 3,
                    opacity: 0.5
                }
            },
            {
                name: "Bình Phước",
                zoom: 12,
                geojson: JSON.stringify(binh_phuoc),
                style: {
                    color: "#ff7800",
                    weight: 3,
                    opacity: 0.5
                }
            },
            {
                name: "Bình Thuận",
                zoom: 12,
                geojson: JSON.stringify(binh_thuan),
                style: {
                    color: "#ff7800",
                    weight: 3,
                    opacity: 0.5
                }
            },
            {
                name: "Cà Mau",
                zoom: 12,
                geojson: JSON.stringify(ca_mau),
                style: {
                    color: "#ff7800",
                    weight: 3,
                    opacity: 0.5
                }
            },
            {
                name: "Cần Thơ",
                zoom: 12,
                geojson: JSON.stringify(can_tho),
                style: {
                    color: "#ff7800",
                    weight: 3,
                    opacity: 0.5
                }
            },
            {
                name: "Cao Bằng",
                zoom: 12,
                geojson: JSON.stringify(cao_bang),
                style: {
                    color: "#ff7800",
                    weight: 3,
                    opacity: 0.5
                }
            },
            {
                name: "Đà Nẵng",
                zoom: 12,
                geojson: JSON.stringify(da_nang),
                style: {
                    color: "#ff7800",
                    weight: 3,
                    opacity: 0.5
                }
            },
            {
                name: "Đắk Lắk",
                zoom: 12,
                geojson: JSON.stringify(dak_lak),
                style: {
                    color: "#ff7800",
                    weight: 3,
                    opacity: 0.5
                }
            },
            {
                name: "Đắk Nông",
                zoom: 12,
                geojson: JSON.stringify(dak_nong),
                style: {
                    color: "#ff7800",
                    weight: 3,
                    opacity: 0.5
                }
            },
            {
                name: "Điện Biên",
                zoom: 12,
                geojson: JSON.stringify(dien_bien),
                style: {
                    color: "#ff7800",
                    weight: 3,
                    opacity: 0.5
                }
            },
            {
                name: "Đồng Nai",
                zoom: 12,
                geojson: JSON.stringify(dong_nai),
                style: {
                    color: "#ff7800",
                    weight: 3,
                    opacity: 0.5
                }
            },
            {
                name: "Đồng Tháp",
                zoom: 12,
                geojson: JSON.stringify(dong_thap),
                style: {
                    color: "#ff7800",
                    weight: 3,
                    opacity: 0.5
                }
            },
            {
                name: "Gia Lai",
                zoom: 12,
                geojson: JSON.stringify(gia_lai),
                style: {
                    color: "#ff7800",
                    weight: 3,
                    opacity: 0.5
                }
            },
            {
                name: "Hà Giang",
                zoom: 12,
                geojson: JSON.stringify(ha_giang),
                style: {
                    color: "#ff7800",
                    weight: 3,
                    opacity: 0.5
                }
            },
            {
                name: "Hà Nam",
                zoom: 12,
                geojson: JSON.stringify(ha_nam),
                style: {
                    color: "#ff7800",
                    weight: 3,
                    opacity: 0.5
                }
            },
            {
                name: "Hà Tĩnh",
                zoom: 12,
                geojson: JSON.stringify(ha_tinh),
                style: {
                    color: "#ff7800",
                    weight: 3,
                    opacity: 0.5
                }
            },
            {
                name: "Hải Dương",
                zoom: 12,
                geojson: JSON.stringify(hai_duong),
                style: {
                    color: "#ff7800",
                    weight: 3,
                    opacity: 0.5
                }
            },
            {
                name: "Hải Phòng",
                zoom: 12,
                geojson: JSON.stringify(hai_phong),
                style: {
                    color: "#ff7800",
                    weight: 3,
                    opacity: 0.5
                }
            },
            {
                name: "Hậu Giang",
                zoom: 12,
                geojson: JSON.stringify(hau_giang),
                style: {
                    color: "#ff7800",
                    weight: 3,
                    opacity: 0.5
                }
            },
            {
                name: "Hòa Bình",
                zoom: 12,
                geojson: JSON.stringify(hoa_binh),
                style: {
                    color: "#ff7800",
                    weight: 3,
                    opacity: 0.5
                }
            },
            {
                name: "Hưng Yên",
                zoom: 12,
                geojson: JSON.stringify(hung_yen),
                style: {
                    color: "#ff7800",
                    weight: 3,
                    opacity: 0.5
                }
            },
            {
                name: "Khánh Hòa",
                zoom: 12,
                geojson: JSON.stringify(khanh_hoa),
                style: {
                    color: "#ff7800",
                    weight: 3,
                    opacity: 0.5
                }
            },
            {
                name: "Kiên Giang",
                zoom: 12,
                geojson: JSON.stringify(kien_giang),
                style: {
                    color: "#ff7800",
                    weight: 3,
                    opacity: 0.5
                }
            },
            {
                name: "Kon Tum",
                zoom: 12,
                geojson: JSON.stringify(kon_tum),
                style: {
                    color: "#ff7800",
                    weight: 3,
                    opacity: 0.5
                }
            },
            {
                name: "Lai Châu",
                zoom: 12,
                geojson: JSON.stringify(lai_chau),
                style: {
                    color: "#ff7800",
                    weight: 3,
                    opacity: 0.5
                }
            },
            {
                name: "Lâm Đồng",
                zoom: 12,
                geojson: JSON.stringify(lam_dong),
                style: {
                    color: "#ff7800",
                    weight: 3,
                    opacity: 0.5
                }
            },
            {
                name: "Lạng Sơn",
                zoom: 12,
                geojson: JSON.stringify(lang_son),
                style: {
                    color: "#ff7800",
                    weight: 3,
                    opacity: 0.5
                }
            },
            {
                name: "Lào Cai",
                zoom: 12,
                geojson: JSON.stringify(lao_cai),
                style: {
                    color: "#ff7800",
                    weight: 3,
                    opacity: 0.5
                }
            },
            {
                name: "Long An",
                zoom: 12,
                geojson: JSON.stringify(long_an),
                style: {
                    color: "#ff7800",
                    weight: 3,
                    opacity: 0.5
                }
            },
            {
                name: "Nam Định",
                zoom: 12,
                geojson: JSON.stringify(nam_dinh),
                style: {
                    color: "#ff7800",
                    weight: 3,
                    opacity: 0.5
                }
            },
            {
                name: "Nghệ An",
                zoom: 12,
                geojson: JSON.stringify(nghe_an),
                style: {
                    color: "#ff7800",
                    weight: 3,
                    opacity: 0.5
                }
            },
            {
                name: "Ninh Bình",
                zoom: 12,
                geojson: JSON.stringify(ninh_binh),
                style: {
                    color: "#ff7800",
                    weight: 3,
                    opacity: 0.5
                }
            },
            {
                name: "Ninh Thuận",
                zoom: 12,
                geojson: JSON.stringify(ninh_thuan),
                style: {
                    color: "#ff7800",
                    weight: 3,
                    opacity: 0.5
                }
            },
            {
                name: "Phú Thọ",
                zoom: 12,
                geojson: JSON.stringify(phu_tho),
                style: {
                    color: "#ff7800",
                    weight: 3,
                    opacity: 0.5
                }
            },
            {
                name: "Phú Yên",
                zoom: 12,
                geojson: JSON.stringify(phu_yen),
                style: {
                    color: "#ff7800",
                    weight: 3,
                    opacity: 0.5
                }
            },
            {
                name: "Quảng Bình",
                zoom: 12,
                geojson: JSON.stringify(quang_binh),
                style: {
                    color: "#ff7800",
                    weight: 3,
                    opacity: 0.5
                }
            },
            {
                name: "Quảng Nam",
                zoom: 12,
                geojson: JSON.stringify(quang_nam),
                style: {
                    color: "#ff7800",
                    weight: 3,
                    opacity: 0.5
                }
            },
            {
                name: "Quảng Ngãi",
                zoom: 12,
                geojson: JSON.stringify(quang_ngai),
                style: {
                    color: "#ff7800",
                    weight: 3,
                    opacity: 0.5
                }
            },
            {
                name: "Quảng Ninh",
                zoom: 12,
                geojson: JSON.stringify(quang_ninh),
                style: {
                    color: "#ff7800",
                    weight: 3,
                    opacity: 0.5
                }
            },
            {
                name: "Quảng Trị",
                zoom: 12,
                geojson: JSON.stringify(quang_tri),
                style: {
                    color: "#ff7800",
                    weight: 3,
                    opacity: 0.5
                }
            },
            {
                name: "Sóc Trăng",
                zoom: 12,
                geojson: JSON.stringify(soc_trang),
                style: {
                    color: "#ff7800",
                    weight: 3,
                    opacity: 0.5
                }
            },
            {
                name: "Sơn La",
                zoom: 12,
                geojson: JSON.stringify(son_la),
                style: {
                    color: "#ff7800",
                    weight: 3,
                    opacity: 0.5
                }
            },
            {
                name: "Tây Ninh",
                zoom: 12,
                geojson: JSON.stringify(tay_ninh),
                style: {
                    color: "#ff7800",
                    weight: 3,
                    opacity: 0.5
                }
            },
            {
                name: "Thái Bình",
                zoom: 12,
                geojson: JSON.stringify(thai_binh),
                style: {
                    color: "#ff7800",
                    weight: 3,
                    opacity: 0.5
                }
            },
            {
                name: "Thái Nguyên",
                zoom: 12,
                geojson: JSON.stringify(thai_nguyen),
                style: {
                    color: "#ff7800",
                    weight: 3,
                    opacity: 0.5
                }
            },
            {
                name: "Thanh Hóa",
                zoom: 12,
                geojson: JSON.stringify(thanh_hoa),
                style: {
                    color: "#ff7800",
                    weight: 3,
                    opacity: 0.5
                }
            },
            {
                name: "Thừa Thiên Huế",
                zoom: 12,
                geojson: JSON.stringify(thua_thien_hue),
                style: {
                    color: "#ff7800",
                    weight: 3,
                    opacity: 0.5
                }
            },
            {
                name: "Tiền Giang",
                zoom: 12,
                geojson: JSON.stringify(tien_giang),
                style: {
                    color: "#ff7800",
                    weight: 3,
                    opacity: 0.5
                }
            },
            {
                name: "Trà Vinh",
                zoom: 12,
                geojson: JSON.stringify(tra_vinh),
                style: {
                    color: "#ff7800",
                    weight: 3,
                    opacity: 0.5
                }
            },
            {
                name: "Tuyên Quang",
                zoom: 12,
                geojson: JSON.stringify(tuyen_quang),
                style: {
                    color: "#ff7800",
                    weight: 3,
                    opacity: 0.5
                }
            },
            {
                name: "Vĩnh Phúc",
                zoom: 12,
                geojson: JSON.stringify(vinh_phuc),
                style: {
                    color: "#ff7800",
                    weight: 3,
                    opacity: 0.5
                }
            },
            {
                name: "Yên Bái",
                zoom: 12,
                geojson: JSON.stringify(yen_bai),
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
