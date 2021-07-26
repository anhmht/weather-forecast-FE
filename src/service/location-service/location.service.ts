import { ApiResponse } from "@/model/app-config";
import { GenericServices } from "../generic-service/generic.service";
import Uri from "@/constant/uri/post-consants";

export class LocationServices extends GenericServices {
    getCurrentLocation(ipAddress: string): Promise<ApiResponse> {
        return this.executeSelecting({ ipAddress }, Uri.getCurrentLocation).then((response: ApiResponse) => {
            return response.isSuccess ? Promise.resolve(response.data) : Promise.reject(response.message);
        }).catch(error => Promise.reject(error))
    }
}
