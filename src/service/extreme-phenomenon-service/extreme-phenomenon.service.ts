import { ApiResponse } from "@/model/app-config";
import { GenericServices } from "../generic-service/generic.service";
import Uri from "@/constant/uri/extremephenomenon-constant";
import { IExtremePhenomenonsSearchParams } from "@/model/extreme-phenomenon";

export class ExtremePhenomenonServices extends GenericServices {
    getAllExtremePhenomenons(payload: IExtremePhenomenonsSearchParams): Promise<ApiResponse> {
        return this.executeSelectingPost(payload, Uri.getAllExtremePhenomenons).then((response: ApiResponse) => {
            return Promise.resolve(response)
        }).catch(error => Promise.reject(error))
    }

    getExtremePhenomenonById(id: string): Promise<ApiResponse> {
        const uri = Uri.getExtremePhenomenonById.replace(":id", id)
        return this.executeSelecting({}, uri).then((response: ApiResponse) => {
            return Promise.resolve(response)
        }).catch(error => Promise.reject(error))
    }
}
