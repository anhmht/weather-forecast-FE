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
    getPrecipitationByStation(stationId: string): Promise<ApiResponse> {
        const uri = `${Uri.getPrecipitationByStation}?diemDuBaoId=${stationId}`
        return this.executeSelecting({}, uri).then((response: ApiResponse) => {
            return Promise.resolve(response)
        }).catch(error => Promise.reject(error))
    }
    getWindLevelByStation(stationId: string): Promise<ApiResponse> {
        const uri = `${Uri.getWindLevelByStation}?diemDuBaoId=${stationId}`
        return this.executeSelecting({}, uri).then((response: ApiResponse) => {
            return Promise.resolve(response)
        }).catch(error => Promise.reject(error))
    }
    getHumidityByStation(stationId: string): Promise<ApiResponse> {
        const uri = `${Uri.getHumidityByStation}?diemDuBaoId=${stationId}`
        return this.executeSelecting({}, uri).then((response: ApiResponse) => {
            return Promise.resolve(response)
        }).catch(error => Promise.reject(error))
    }
    getIconWeather(stationId: string): Promise<ApiResponse> {
        const uri = `${Uri.getIconWeatherByStation}?diemDuBaoId=${stationId}`
        return this.executeSelecting({}, uri).then((response: ApiResponse) => {
            return Promise.resolve(response)
        }).catch(error => Promise.reject(error))
    }
    getMinMaxTemperatureByStation(stationId: string): Promise<ApiResponse> {
        const uri = `${Uri.getMinMaxTemperatureByStation}?diemDuBaoId=${stationId}`
        return this.executeSelecting({}, uri).then((response: ApiResponse) => {
            return Promise.resolve(response)
        }).catch(error => Promise.reject(error))
    }
    getMinMaxPrecipitationByStation(stationId: string): Promise<ApiResponse> {
        const uri = `${Uri.getMinMaxPrecipitationByStation}?diemDuBaoId=${stationId}`
        return this.executeSelecting({}, uri).then((response: ApiResponse) => {
            return Promise.resolve(response)
        }).catch(error => Promise.reject(error))
    }
    getMinMaxWindLevelByStation(stationId: string): Promise<ApiResponse> {
        const uri = `${Uri.getMinMaxWindLevelByStation}?diemDuBaoId=${stationId}`
        return this.executeSelecting({}, uri).then((response: ApiResponse) => {
            return Promise.resolve(response)
        }).catch(error => Promise.reject(error))
    }
    getMinMaxHumidityByStation(stationId: string): Promise<ApiResponse> {
        const uri = `${Uri.getMinMaxHumidityByStation}?diaDuBaoId=${stationId}`
        return this.executeSelecting({}, uri).then((response: ApiResponse) => {
            return Promise.resolve(response)
        }).catch(error => Promise.reject(error))
    }
    getMinMaxWindSpeedByStation(stationId: string): Promise<ApiResponse> {
        const uri = `${Uri.getMinMaxWindSpeedByStation}?diaDuBaoId=${stationId}`
        return this.executeSelecting({}, uri).then((response: ApiResponse) => {
            return Promise.resolve(response)
        }).catch(error => Promise.reject(error))
    }
}
