import { ApiResponse } from "@/model/app-config";
import { GenericServices } from "../generic-service/generic.service";
import Uri from "@/constant/uri/weather-constants";
import { IForecastSearchParam } from "@/model/forecast";

export class WeatherServices extends GenericServices {
    getDetail(payload: IForecastSearchParam): Promise<ApiResponse> {
        return this.executeSelectingPost(payload, Uri.getDetail).then((response: ApiResponse) => {
            return response.isSuccess ? Promise.resolve(response.data) : Promise.reject(response.message);
        }).catch(error => Promise.reject(error))
    }
    getHorizontal(payload: IForecastSearchParam): Promise<ApiResponse> {
        return this.executeSelectingPost(payload, Uri.getHorizontal).then((response: ApiResponse) => {
            return response.isSuccess ? Promise.resolve(response.data) : Promise.reject(response.message);
        }).catch(error => Promise.reject(error))
    }
}
