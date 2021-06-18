import { ApiResponse } from "@/model/app-config";
import { GenericServices } from "../generic-service/generic.service";
import Uri from "@/constant/uri/weather-constants";

export class WeatherServices extends GenericServices {
    getDetail(stationIds: string[], fromDate: string, toDate: string, weatherTypes: number[]): Promise<ApiResponse> {
        return this.executeSelecting({stationIds, fromDate, toDate, weatherTypes}, Uri.getDetail).then((response: ApiResponse) => {
            return Promise.resolve(response)
        }).catch(error => Promise.reject(error))
    }
    getHorizontal(stationIds: string[], fromDate: string, toDate: string, weatherTypes: number[]): Promise<ApiResponse> {
        return this.executeSelecting({stationIds, fromDate, toDate, weatherTypes}, Uri.getHorizontal).then((response: ApiResponse) => {
            return Promise.resolve(response)
        }).catch(error => Promise.reject(error))
    }
}
