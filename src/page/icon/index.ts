import Vue from "vue";
import Component from "vue-class-component";
import sun from '../../../static/img/icon/new/sun.png';
import moon from '../../../static/img/icon/new/moon.png';
import sun_35 from '../../../static/img/icon/new/sun_35.png';
import sun_37 from '../../../static/img/icon/new/sun_37.png';
import sun_39 from '../../../static/img/icon/new/sun_39.png';
import sun_cloud from '../../../static/img/icon/new/sun_cloud.png';
import moon_cloud from '../../../static/img/icon/new/moon_cloud.png';
import sun_cloud_35 from '../../../static/img/icon/new/sun_cloud_35.png';
import sun_cloud_37 from '../../../static/img/icon/new/sun_cloud_37.png';
import sun_cloud_39 from '../../../static/img/icon/new/sun_cloud_39.png';
import sun_mist from '../../../static/img/icon/new/sun_mist.png';
import moon_mist from '../../../static/img/icon/new/moon_mist.png';
import cloud_sun from '../../../static/img/icon/new/cloud_sun.png';
import cloud_moon from '../../../static/img/icon/new/cloud_moon.png';
import day_rain from '../../../static/img/icon/new/day_rain.png';
import night_rain from '../../../static/img/icon/new/night_rain.png';
import day_rain_thunder from '../../../static/img/icon/new/day_rain_thunder.png';
import night_rain_thunder from '../../../static/img/icon/new/night_rain_thunder.png';
import cloud from '../../../static/img/icon/new/cloud.png';
import cloud_20 from '../../../static/img/icon/new/cloud_20.png';
import cloud_15 from '../../../static/img/icon/new/cloud_15.png';
import cloud_13 from '../../../static/img/icon/new/cloud_13.png';
import cloud_rain_20 from '../../../static/img/icon/new/cloud_rain_20.png';
import cloud_rain_15 from '../../../static/img/icon/new/cloud_rain_15.png';
import cloud_rain_13 from '../../../static/img/icon/new/cloud_rain_13.png';
import cloud_rain_0 from '../../../static/img/icon/new/cloud_rain_0.png';
import cloud_mist from '../../../static/img/icon/new/cloud_mist.png';
import cloud_rain from '../../../static/img/icon/new/cloud_rain.png';
import cloud_rain_mist from '../../../static/img/icon/new/cloud_rain_mist.png';
import cloud_rain1 from '../../../static/img/icon/new/cloud_rain1.png';
import cloud_rain2 from '../../../static/img/icon/new/cloud_rain2.png';
import cloud_rain3 from '../../../static/img/icon/new/cloud_rain3.png';
import cloud_rain4 from '../../../static/img/icon/new/cloud_rain4.png';
import cloud_rain5 from '../../../static/img/icon/new/cloud_rain5.png';
import cloud_rain6 from '../../../static/img/icon/new/cloud_rain6.png';
import cloud_rain7 from '../../../static/img/icon/new/cloud_rain7.png';
@Component({
    template: require("./template.html").default,
    components: {
        "base-container": () => import("../../components/base-container/BaseContainerComponent.vue")
    }
})
export default class IconPageComponent extends Vue {
    get listIcon_1() {
        return [
            {
                description:'Quang mây, không mưa',
                url: sun,
                id: '0001'
            },
            {
                description:'Quang mây, ngày trời nắng',
                url: sun,
                id: '0002'
            },
            {
                description:'Quang mây, đêm không mưa',
                url: moon,
                id: '0003'
            },
            {
                description:'Quang mây, trời nắng nóng',
                url: sun_35,
                id: '0011'
            },
            {
                description:'Quang mây, ngày nắng nóng',
                url: sun_35,
                id: '0012'
            },
            {
                description:'Quang mây, trời nắng nóng gay gắt',
                url: sun_37,
                id: '0021'
            },
            {
                description:'Quang mây, ngày nắng nóng gay gắt',
                url: sun_37,
                id: '0022'
            },
            {
                description:'Quang mây, trời nắng nóng đặc biệt gay gắt',
                url: sun_39,
                id: '0031'
            },
            {
                description:'Quang mây, ngày nắng nóng đặc biệt gay gắt',
                url: sun_39,
                id: '0032'
            },
        ]
    }

    get listIcon_2() {
        return [
            {
                description: 'Ít mây, không mưa',
                url: sun_cloud,
                id: '1001'
            },
            {
                description: 'Ít mây, ngày trời nắng',
                url: sun_cloud,
                id: '1002'
            },
            {
                description: 'Ít mây, đêm không mưa',
                url: moon_cloud,
                id: '1003'
            },
            {
                description: 'Ít mây, trời nắng nóng',
                url: sun_cloud_35,
                id: '1011'
            },
            {
                description: 'Ít mây, ngày nắng nóng',
                url: sun_cloud_35,
                id: '1012'
            },
            {
                description: 'Ít mây, trời nắng nóng gay gắt',
                url: sun_cloud_37,
                id: '1021'
            },
            {
                description: 'Ít mây, ngày nắng nóng gay gắt',
                url: sun_cloud_37,
                id: '1022'
            },
            {
                description: 'Ít mây, trời nắng nóng đặc biệt gay gắt',
                url: sun_cloud_39,
                id: '1031'
            },
            {
                description: 'Ít mây, ngày nắng nóng đặc biệt gay gắt',
                url: sun_cloud_39,
                id: '1032'
            },
            {
                description: 'Ít mây, có sương mù',
                url: sun_mist,
                id: '1081'
            },
            {
                description: 'Ít mây, ngày có sương mù',
                url: sun_mist,
                id: '1082'
            },
            {
                description: 'Ít mây, đêm có sương mù',
                url: moon_mist,
                id: '1083'
            },
        ]
    }

    get listIcon_3() {
        return [
            {
                description: 'Có mây, không mưa',
                url: cloud_sun,
                id: '2001'
            },
            {
                description: 'Có mây, ngày không mưa',
                url: cloud_sun,
                id: '2002'
            },
            {
                description: 'Có mây, đêm không mưa',
                url: cloud_moon,
                id: '2003'
            },
            {
                description: 'Có mây, có mưa rào',
                url: day_rain,
                id: '2301'
            },
            {
                description: 'Có mây, ngày có mưa rào',
                url: day_rain,
                id: '2302'
            },
            {
                description: 'Có mây, đêm có mưa rào',
                url: night_rain,
                id: '2303'
            },
            {
                description: 'Có mây, có mưa rào và dông',
                url: day_rain_thunder,
                id: '2501'
            },
            {
                description: 'Có mây, ngày có mưa rào và dông',
                url: day_rain_thunder,
                id: '2502'
            },
            {
                description: 'Có mây, đêm có mưa rào và dông',
                url: night_rain_thunder,
                id: '2503'
            },
        ]
    }

    get listIcon_4() {
        return [
            {
                description: 'Nhiều mây, không mưa',
                url: cloud,
                id: '4001'
            },
            {
                description: 'Nhiều mây, không mưa; trời rét',
                url: cloud_20,
                id: '4041'
            },
            {
                description: 'Nhiều mây, không mưa; trời rét đậm',
                url: cloud_15,
                id: '4051'
            },
            {
                description: 'Nhiều mây, không mưa; trời rét hại',
                url: cloud_13,
                id: '4061'
            },
            {
                description: 'Nhiều mây, có mưa; trời rét',
                url: cloud_rain_20,
                id: '4341'
            },
            {
                description: 'Nhiều mây, có mưa; trời rét đậm',
                url: cloud_rain_15,
                id: '4351'
            },
            {
                description: 'Nhiều mây, có mưa; trời rét hại',
                url: cloud_rain_13,
                id: '4361'
            },
            {
                description: 'Nhiều mây, có mưa; trời rét hại kèm khả năng băng giá, mưa tuyết',
                url: cloud_rain_0,
                id: '4391'
            },
            {
                description: 'Nhiều mây, không mưa; trời rét hại kèm khả năng sương muối',
                url: cloud_mist,
                id: '4091'
            },
            {
                description: 'Nhiều mây, có mưa phùn',
                url: cloud_rain,
                id: '4101'
            },
            {
                description: 'Nhiều mây, có mưa phùn và sương mù',
                url: cloud_rain_mist,
                id: '4181'
            },
            {
                description: 'Nhiều mây, có mưa nhỏ',
                url: cloud_rain1,
                id: '4201'
            },
            {
                description: 'Nhiều mây, có mưa, mưa rào',
                url: cloud_rain2,
                id: '4301'
            },
            {
                description: 'Nhiều mây, có mưa vừa',
                url: cloud_rain3,
                id: '4401'
            },
            {
                description: 'Nhiều mây, có mưa dông',
                url: cloud_rain4,
                id: '4541'
            },
            {
                description: 'Nhiều mây, có mưa to',
                url: cloud_rain5,
                id: '4601'
            },
            {
                description: 'Có mưa đá',
                url: cloud_rain6,
                id: '4701'
            },
            {
                description: 'Nhiều mây, có mưa dông; trong cơn dông có khả năng xảy ra tố, lốc, gió giật mạnh',
                url: cloud_rain7,
                id: '4571'
            },
        ]
    }
}
