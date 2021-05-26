import { ApiResponse } from "@/model/app-config";
import { GenericServices } from "../generic-service/generic.service";
import Uri from "@/constant/uri/user-constant";

export class StatusServices extends GenericServices {
    getAllStatuses(): Promise<ApiResponse> {
        return this.executeSelecting(null, Uri.getAllStatuses).then((response: ApiResponse) => {
            return Promise.resolve(response)
        }).catch(error => Promise.reject(error))
    }
}
