import { ApiResponse } from "@/model/app-config";
import { GenericServices } from "../generic-service/generic.service";
import Uri from "@/constant/uri/monitoring-constants";

export class MonitoringServices extends GenericServices {
    getPrecipitation(limit: number, page: number, stationId: string, dateFrom: string, dateTo: string): Promise<ApiResponse> {
        return this.executeSelectingPost({limit, page, stationId, dateFrom, dateTo}, Uri.getPrecipitation).then((response: ApiResponse) => {
            return response.isSuccess ? Promise.resolve(response.data) : Promise.reject(response.message);
            }).catch(error => Promise.reject(error))
    }
    getMeteorological(limit: number, page: number, stationId: string, dateFrom: string, dateTo: string): Promise<ApiResponse> {
        return this.executeSelectingPost({limit, page, stationId, dateFrom, dateTo}, Uri.getMeteorological).then((response: ApiResponse) => {
            return response.isSuccess ? Promise.resolve(response.data) : Promise.reject(response.message);
            }).catch(error => Promise.reject(error))
    }
    getHydrological(limit: number, page: number, stationId: string, dateFrom: string, dateTo: string): Promise<ApiResponse> {
        return this.executeSelectingPost({limit, page, stationId, dateFrom, dateTo}, Uri.getHydrological).then((response: ApiResponse) => {
            return response.isSuccess ? Promise.resolve(response.data) : Promise.reject(response.message);
            }).catch(error => Promise.reject(error))
    }
    getHydrologicalForecast(limit: number, page: number, stationId: string, dateFrom: string, dateTo: string): Promise<ApiResponse> {
        return this.executeSelectingPost({ limit, page, stationId, dateFrom, dateTo}, Uri.getHydrologicalForecast).then((response: ApiResponse) => {
            return response.isSuccess ? Promise.resolve(response.data) : Promise.reject(response.message);
            }).catch(error => Promise.reject(error))
    }
}
