import { ApiResponse } from "@/model/app-config";
import { GenericServices } from "../generic-service/generic.service";
import Uri from "@/constant/uri/user-constant";

export class LocationServices extends GenericServices {
    getCurrentLocation(lat: number, lon: number, ipAddress: string): Promise<ApiResponse> {
        console.log(ipAddress, 1111111);

        return this.executeSelecting({ lat, lon, ipAddress }, Uri.getCurrentLocation).then((response: ApiResponse) => {
            return Promise.resolve(response)
        }).catch(error => Promise.reject(error))
    }
}
