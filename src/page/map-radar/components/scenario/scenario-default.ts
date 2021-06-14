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
    {
        action: 'customLocationControl',
        method: 'handleClick',
        data: 'VL',
        duration: 10000
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
    [3000]: '3 giây',
    [5000]: '5 giây',
    [10000]: '10 giây',
    [20000]: '20 giây',
    [0]: '0 giây',
}
