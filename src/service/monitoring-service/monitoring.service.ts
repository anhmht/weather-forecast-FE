import { ApiResponse } from "@/model/app-config";
import { GenericServices } from "../generic-service/generic.service";
import Uri from "@/constant/uri/monitoring-constants";

export class MonitoringServices extends GenericServices {
    getPrecipitation(limit: number, page: number, stationId: string, dateFrom: string, dateTo: string): Promise<ApiResponse> {
        return this.executeSelectingPost({limit, page, stationId, dateFrom, dateTo}, Uri.getPrecipitation).then((response: ApiResponse) => {
            return Promise.resolve(response)
            }).catch(error => Promise.reject(error))
    }
    getMeteorological(limit: number, page: number, stationId: string, dateFrom: string, dateTo: string): Promise<ApiResponse> {
        return this.executeSelectingPost({limit, page, stationId, dateFrom, dateTo}, Uri.getMeteorological).then((response: ApiResponse) => {
            return Promise.resolve(response)
            }).catch(error => Promise.reject(error))
    }
    getHydrological(limit: number, page: number, stationId: string, dateFrom: string, dateTo: string): Promise<ApiResponse> {
        return this.executeSelectingPost({limit, page, stationId, dateFrom, dateTo}, Uri.getHydrological).then((response: ApiResponse) => {
            return Promise.resolve(response)
            }).catch(error => Promise.reject(error))
    }
}