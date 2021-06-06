import { ApiResponse } from "@/model/app-config";
import { GenericServices } from "../generic-service/generic.service";
import Uri from "@/constant/uri/forcast-constants";

export class ForecastServices extends GenericServices {
    getForecastStation(): Promise<ApiResponse> {
        return this.executeSelecting({}, Uri.getForecastStation).then((response: ApiResponse) => {
            return Promise.resolve(response)
        }).catch(error => Promise.reject(error))
    }
    getTemperatureByStation(stationId: string): Promise<ApiResponse> {
        const uri = `${Uri.getTemperatureByStation}?diemDuBaoId=${stationId}`
        return this.executeSelecting({}, uri).then((response: ApiResponse) => {
            return Promise.resolve(response)
        }).catch(error => Promise.reject(error))
    }
    getIconWeahter(stationId: string): Promise<ApiResponse> {
        const uri = `${Uri.getIconWeatherByStation}?diemDuBaoId=${stationId}`
        return this.executeSelecting({}, uri).then((response: ApiResponse) => {
            return Promise.resolve(response)
        }).catch(error => Promise.reject(error))
    }
}
