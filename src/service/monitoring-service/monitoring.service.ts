import { ApiResponse } from "@/model/app-config";
import { GenericServices } from "../generic-service/generic.service";
import Uri from "@/constant/uri/monitoring-constants";

export class MonitoringServices extends GenericServices {
    getMonitoringStation(): Promise<ApiResponse> {
        return this.executeSelecting({}, Uri.getMonitoringStation).then((response: ApiResponse) => {
            return Promise.resolve(response)
        }).catch(error => Promise.reject(error))
    }
    getPrecipitation(zipcodes: number[]): Promise<ApiResponse> {
        const uri = `${Uri.getPrecipitation}?zipcodes=${zipcodes}`
        return this.executeSelecting({}, uri).then((response: ApiResponse) => {
            return Promise.resolve(response)
        }).catch(error => Promise.reject(error))
    }
    getMeteorological(zipcodes: number[]): Promise<ApiResponse> {
        const uri = `${Uri.getMeteorological}?zipcodes=${zipcodes}`
        return this.executeSelecting({}, uri).then((response: ApiResponse) => {
            return Promise.resolve(response)
        }).catch(error => Promise.reject(error))
    }
    getHydrological(zipcodes: number[]): Promise<ApiResponse> {
        const uri = `${Uri.getHydrological}?zipcodes=${zipcodes}`
        return this.executeSelecting({}, uri).then((response: ApiResponse) => {
            return Promise.resolve(response)
        }).catch(error => Promise.reject(error))
    }
}
