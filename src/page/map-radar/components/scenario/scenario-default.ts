export const DEFAULT_SCENARIOS = [
    {
        action: 'customLocationControl',
        method: 'handleClickRegion',
        data: 'TBB',
        duration: 3000
    },
    {
        action: 'customLocationControl',
        method: 'handleClickRegion',
        data: 'DBB',
        duration: 5000
    },
    {
        action: 'customLocationControl',
        method: 'handleClickRegion',
        data: 'NTB',
        duration: 5000
    },
    {
        action: 'customLocationControl',
        method: 'handleClickRegion',
        data: 'DNB',
        duration: 5000
    },
    {
        action: 'customLocationControl',
        method: 'handleClickRegion',
        data: 'TNB',
        duration: 5000
    },
]
export const SCENARIO_ACTION = [
    {
        text: 'Di chuyển bản đồ',
        value: 'customLocationControl'
    },
    {
        text: 'Đổi trạng thái thời tiết',
        value: 'customMapStatusControl'
    },
    {
        text: 'Đổi độ cao',
        value: 'customLevelControl'
    },
    {
        text: 'Thu phóng bản đồ',
        value: 'customZoomControl'
    },
]
export const SCENARIO_LOCATION_METHOD = [
    {
        text: 'Khu Vực',
        value: 'handleClickRegion',
    },
    {
        text: 'Tỉnh Thành',
        value: 'handleClick',
    },
]
export const SCENARIO_DURATION = {
    [2000]: '2 giây',
    [3000]: '3 giây',
    [5000]: '5 giây',
    [10000]: '10 giây',
    [20000]: '20 giây',
    [0]: '-',
}


export const SCENARIO_ZOOM = {
    [7]: '3',
    [8]: '5',
    [9]: '10',
    [10]: '20',
    [11]: '11',
}

export const ELEVATION = [
    { label: "0m", value: 0, data: "surface" },
    { label: "100m", value: 1, data: "975h" },
    { label: "600m", value: 2, data: "950h" },
    { label: "750m", value: 3, data: "925h" },
    { label: "900m", value: 4, data: "900h" },
    { label: "1500m", value: 5, data: "850h" },
    { label: "2000m", value: 6, data: "800h" },
    { label: "3000m", value: 7, data: "700h" },
    { label: "4200m", value: 8, data: "600h" },
    { label: "5500m", value: 9, data: "500h" },
    { label: "7000m", value: 10, data: "400h" },
    { label: "9000m", value: 11, data: "300h" },
    { label: "10km", value: 12, data: "250h" },
]
