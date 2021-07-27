import { ApiResponse } from "@/model/app-config";
import { GenericServices } from "../generic-service/generic.service";
import Uri from "@/constant/uri/common-constants";

export class LookupServices extends GenericServices {
    getAllStatuses(): Promise<ApiResponse> {
        return this.executeSelecting(null, Uri.getAllStatuses).then((response: ApiResponse) => {
            return response.isSuccess ? Promise.resolve(response.data) : Promise.reject(response.message);
        }).catch(error => Promise.reject(error))
    }

    getAllStationKTTV(): Promise<ApiResponse> {
        return this.executeSelecting(null, Uri.getAllStationKTTV).then((response: ApiResponse) => {
            return response.isSuccess ? Promise.resolve(response.data) : Promise.reject(response.message);
        }).catch(error => Promise.reject(error))
    }

    getGeneralLookup(payload: number[]): Promise<ApiResponse> {
        return this.executeSelectingPost(payload, Uri.getGeneralLookup).then((response: ApiResponse) => {
            return response.isSuccess ? Promise.resolve(response.data) : Promise.reject(response.message);
        }).catch(error => Promise.reject(error))
    }
}
