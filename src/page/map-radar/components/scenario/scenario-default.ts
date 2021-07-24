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
        value: 'customLocationControl',
        color: 'blue'
    },
    {
        text: 'Đổi trạng thái thời tiết',
        value: 'customMapStatusControl',
        color: 'pink'
    },
    {
        text: 'Đổi độ cao',
        value: 'customLevelControl',
        color: 'green'
    },
    {
        text: 'Thu phóng bản đồ',
        value: 'customZoomControl',
        color: 'black'
    },
    {
        text: 'Chờ',
        value: 'customWaitControl',
        color: 'yellow'
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
    [1000]: '1 giây',
    [2000]: '2 giây',
    [3000]: '3 giây',
    [5000]: '5 giây',
    [10000]: '10 giây',
    [15000]: '15 giây',
    [20000]: '20 giây',
    [25000]: '25 giây',
    [30000]: '30 giây',
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

export const SCENARIO_ACTION_ENUM = {
    MOVE_MAP: 1,
    CHANGE_MAP_STATUS: 2,
    CHANGE_ELEVATION: 3,
    CHANGE_ZOOM_LEVEL: 4,
    WAIT: 5
}

export const SCENARIO_ACTION_METHOD_ENUM = {
    REGION: 1,
    PROVINCE: 2,
    LEVEL: 3
}

export const SCENARIO_ACTION_DETAIL_ENUM = {
    TITLE: 1,
    TEMP_INFO: 2,
    TEXT_BOX: 3
}


export const POSITION = [
    { text: 'top', value: 1 },
    { text: 'top-left', value: 2 },
    { text: 'top-right', value: 3 },
    { text: 'middle', value: 4 },
    { text: 'middle-left', value: 5 },
    { text: 'middle-right', value: 6 },
    { text: 'bottom', value: 7 },
    { text: 'bottom-left', value: 8 },
    { text: 'bottom-right', value: 9 },
]