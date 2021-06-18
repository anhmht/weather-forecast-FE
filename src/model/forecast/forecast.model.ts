import moment from 'moment';
export interface IForecastSearchParam {
    stationIds: string[];
    fromDate?: string;
    toDate?: string;
    weatherTypes: number[];
}

export class ForecastSearchParam implements IForecastSearchParam {
    stationIds: string[];
    fromDate?: string;
    toDate?: string;
    weatherTypes: number[];

    constructor() {
        this.stationIds = this.stationIds || [];
        this.fromDate = this.fromDate || moment().subtract(1, 'days').toISOString();
        this.toDate = this.toDate || moment().toISOString();
        this.weatherTypes = this.weatherTypes || [1 ,2 ,4 ,5 ,6 ];
    }
}
