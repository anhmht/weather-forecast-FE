import Vue from "vue";
import Component from "vue-class-component";
@Component({
    template: require("./template.html").default,
    components: {
        "base-container": () => import("../../components/base-container/BaseContainerComponent.vue"),
        "weaher-status": () => import("./components/weather-status/WeatherStatusComponent.vue")
    }
})
export default class IconPageComponent extends Vue {
    activeTab: number = 0

    handleChangeTab(tab) {
        this.activeTab = tab;
    }

    get listIcon_1() {
        return [
            {
                description: 'Quang mây, không mưa',
                url: 'https://weatherstoragevn.blob.core.windows.net/images/icons/0001.png',
                id: '0001'
            },
            {
                description: 'Quang mây, ngày trời nắng',
                url: 'https://weatherstoragevn.blob.core.windows.net/images/icons/0001.png',
                id: '0002'
            },
            {
                description: 'Quang mây, đêm không mưa',
                url: 'https://weatherstoragevn.blob.core.windows.net/images/icons/0003.png',
                id: '0003'
            },
            {
                description: 'Quang mây, trời nắng nóng',
                url: 'https://weatherstoragevn.blob.core.windows.net/images/icons/0011-0012.png',
                id: '0011'
            },
            {
                description: 'Quang mây, ngày nắng nóng',
                url: 'https://weatherstoragevn.blob.core.windows.net/images/icons/0011-0012.png',
                id: '0012'
            },
            {
                description: 'Quang mây, trời nắng nóng gay gắt',
                url: 'https://weatherstoragevn.blob.core.windows.net/images/icons/0021-0022.png',
                id: '0021'
            },
            {
                description: 'Quang mây, ngày nắng nóng gay gắt',
                url: 'https://weatherstoragevn.blob.core.windows.net/images/icons/0021-0022.png',
                id: '0022'
            },
            {
                description: 'Quang mây, trời nắng nóng đặc biệt gay gắt',
                url: 'https://weatherstoragevn.blob.core.windows.net/images/icons/0031-0032.png',
                id: '0031'
            },
            {
                description: 'Quang mây, ngày nắng nóng đặc biệt gay gắt',
                url: 'https://weatherstoragevn.blob.core.windows.net/images/icons/0031-0032.png',
                id: '0032'
            },
        ]
    }

    get listIcon_2() {
        return [
            {
                description: 'Ít mây, không mưa',
                url: 'https://weatherstoragevn.blob.core.windows.net/images/icons/1001-1002.png',
                id: '1001'
            },
            {
                description: 'Ít mây, ngày trời nắng',
                url: 'https://weatherstoragevn.blob.core.windows.net/images/icons/1001-1002.png',
                id: '1002'
            },
            {
                description: 'Ít mây, đêm không mưa',
                url: 'https://weatherstoragevn.blob.core.windows.net/images/icons/1003.png',
                id: '1003'
            },
            {
                description: 'Ít mây, trời nắng nóng',
                url: 'https://weatherstoragevn.blob.core.windows.net/images/icons/1011-1012.png',
                id: '1011'
            },
            {
                description: 'Ít mây, ngày nắng nóng',
                url: 'https://weatherstoragevn.blob.core.windows.net/images/icons/1011-1012.png',
                id: '1012'
            },
            {
                description: 'Ít mây, trời nắng nóng gay gắt',
                url: 'https://weatherstoragevn.blob.core.windows.net/images/icons/1021-1022.png',
                id: '1021'
            },
            {
                description: 'Ít mây, ngày nắng nóng gay gắt',
                url: 'https://weatherstoragevn.blob.core.windows.net/images/icons/1021-1022.png',
                id: '1022'
            },
            {
                description: 'Ít mây, trời nắng nóng đặc biệt gay gắt',
                url: 'https://weatherstoragevn.blob.core.windows.net/images/icons/1031-1032.png',
                id: '1031'
            },
            {
                description: 'Ít mây, ngày nắng nóng đặc biệt gay gắt',
                url: 'https://weatherstoragevn.blob.core.windows.net/images/icons/1031-1032.png',
                id: '1032'
            },
            {
                description: 'Ít mây, có sương mù',
                url: 'https://weatherstoragevn.blob.core.windows.net/images/icons/1081-1082.png',
                id: '1081'
            },
            {
                description: 'Ít mây, ngày có sương mù',
                url: 'https://weatherstoragevn.blob.core.windows.net/images/icons/1081-1082.png',
                id: '1082'
            },
            {
                description: 'Ít mây, đêm có sương mù',
                url: 'https://weatherstoragevn.blob.core.windows.net/images/icons/1083.png',
                id: '1083'
            },
        ]
    }

    get listIcon_3() {
        return [
            {
                description: 'Có mây, không mưa',
                url: 'https://weatherstoragevn.blob.core.windows.net/images/icons/2001-2002.png',
                id: '2001'
            },
            {
                description: 'Có mây, ngày không mưa',
                url: 'https://weatherstoragevn.blob.core.windows.net/images/icons/2001-2002.png',
                id: '2002'
            },
            {
                description: 'Có mây, đêm không mưa',
                url: 'https://weatherstoragevn.blob.core.windows.net/images/icons/2003.png',
                id: '2003'
            },
            {
                description: 'Có mây, có mưa rào',
                url: 'https://weatherstoragevn.blob.core.windows.net/images/icons/2301-2302.png',
                id: '2301'
            },
            {
                description: 'Có mây, ngày có mưa rào',
                url: 'https://weatherstoragevn.blob.core.windows.net/images/icons/2301-2302.png',
                id: '2302'
            },
            {
                description: 'Có mây, đêm có mưa rào',
                url: 'https://weatherstoragevn.blob.core.windows.net/images/icons/2303.png',
                id: '2303'
            },
            {
                description: 'Có mây, có mưa rào và dông',
                url: 'https://weatherstoragevn.blob.core.windows.net/images/icons/2501-2502.png',
                id: '2501'
            },
            {
                description: 'Có mây, ngày có mưa rào và dông',
                url: 'https://weatherstoragevn.blob.core.windows.net/images/icons/2501-2502.png',
                id: '2502'
            },
            {
                description: 'Có mây, đêm có mưa rào và dông',
                url: 'https://weatherstoragevn.blob.core.windows.net/images/icons/2503.png',
                id: '2503'
            },
        ]
    }

    get listIcon_4() {
        return [
            {
                description: 'Nhiều mây, không mưa',
                url: 'https://weatherstoragevn.blob.core.windows.net/images/icons/4001.png',
                id: '4001'
            },
            {
                description: 'Nhiều mây, không mưa; trời rét',
                url: 'https://weatherstoragevn.blob.core.windows.net/images/icons/4041.png',
                id: '4041'
            },
            {
                description: 'Nhiều mây, không mưa; trời rét đậm',
                url: 'https://weatherstoragevn.blob.core.windows.net/images/icons/4051.png',
                id: '4051'
            },
            {
                description: 'Nhiều mây, không mưa; trời rét hại',
                url: 'https://weatherstoragevn.blob.core.windows.net/images/icons/4061.png',
                id: '4061'
            },
            {
                description: 'Nhiều mây, có mưa; trời rét',
                url: 'https://weatherstoragevn.blob.core.windows.net/images/icons/4341.png',
                id: '4341'
            },
            {
                description: 'Nhiều mây, có mưa; trời rét đậm',
                url: 'https://weatherstoragevn.blob.core.windows.net/images/icons/4351.png',
                id: '4351'
            },
            {
                description: 'Nhiều mây, có mưa; trời rét hại',
                url: 'https://weatherstoragevn.blob.core.windows.net/images/icons/4361.png',
                id: '4361'
            },
            {
                description: 'Nhiều mây, có mưa; trời rét hại kèm khả năng băng giá, mưa tuyết',
                url: 'https://weatherstoragevn.blob.core.windows.net/images/icons/4391.png',
                id: '4391'
            },
            {
                description: 'Nhiều mây, không mưa; trời rét hại kèm khả năng sương muối',
                url: 'https://weatherstoragevn.blob.core.windows.net/images/icons/4091.png',
                id: '4091'
            },
            {
                description: 'Nhiều mây, có mưa phùn',
                url: 'https://weatherstoragevn.blob.core.windows.net/images/icons/4101.png',
                id: '4101'
            },
            {
                description: 'Nhiều mây, có mưa phùn và sương mù',
                url: 'https://weatherstoragevn.blob.core.windows.net/images/icons/4181.png',
                id: '4181'
            },
            {
                description: 'Nhiều mây, có mưa nhỏ',
                url: 'https://weatherstoragevn.blob.core.windows.net/images/icons/4201.png',
                id: '4201'
            },
            {
                description: 'Nhiều mây, có mưa, mưa rào',
                url: 'https://weatherstoragevn.blob.core.windows.net/images/icons/4301.png',
                id: '4301'
            },
            {
                description: 'Nhiều mây, có mưa vừa',
                url: 'https://weatherstoragevn.blob.core.windows.net/images/icons/4401.png',
                id: '4401'
            },
            {
                description: 'Nhiều mây, có mưa dông',
                url: 'https://weatherstoragevn.blob.core.windows.net/images/icons/4541.png',
                id: '4541'
            },
            {
                description: 'Nhiều mây, có mưa to',
                url: 'https://weatherstoragevn.blob.core.windows.net/images/icons/4601.png',
                id: '4601'
            },
            {
                description: 'Có mưa đá',
                url: 'https://weatherstoragevn.blob.core.windows.net/images/icons/4701.png',
                id: '4701'
            },
            {
                description: 'Nhiều mây, có mưa dông; trong cơn dông có khả năng xảy ra tố, lốc, gió giật mạnh',
                url: 'https://weatherstoragevn.blob.core.windows.net/images/icons/4571.png',
                id: '4571'
            },
        ]
    }
}
