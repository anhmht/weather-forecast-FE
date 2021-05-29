import { ApiResponse } from "@/model/app-config";
import { GenericServices } from "../generic-service/generic.service";
import Uri from "@/constant/uri/user-constant";

export class LocationServices extends GenericServices {
    getCurrentLocation(lat: number, lon: number): Promise<ApiResponse> {
        return this.executeSelecting({ lat, lon }, Uri.getCurrentLocation).then((response: ApiResponse) => {
            return Promise.resolve(response)
        }).catch(error => Promise.reject(error))
    }
}
