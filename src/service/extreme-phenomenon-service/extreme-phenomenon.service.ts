import { ApiResponse } from "@/model/app-config";
import { GenericServices } from "../generic-service/generic.service";
import Uri from "@/constant/uri/extremephenomenon-constant";
import { IExtremePhenomenon, IExtremePhenomenonsSearchParams } from "@/model/extreme-phenomenon";

export class ExtremePhenomenonServices extends GenericServices {
    getAllExtremePhenomenons(payload: IExtremePhenomenonsSearchParams): Promise<ApiResponse> {
        return this.executeSelectingPost(payload, Uri.getAllExtremePhenomenons).then((response: ApiResponse) => {
            return response.isSuccess ? Promise.resolve(response.data) : Promise.reject(response.message);
        }).catch(error => Promise.reject(error))
    }

    getExtremePhenomenonById(id: string): Promise<ApiResponse> {
        const uri = Uri.getExtremePhenomenonById.replace(":id", id)
        return this.executeSelecting({}, uri).then((response: ApiResponse) => {
            return response.isSuccess ? Promise.resolve(response.data) : Promise.reject(response.message);
        }).catch(error => Promise.reject(error))
    }

    createExtremePhenomenon(payload: IExtremePhenomenon): Promise<ApiResponse> {
        return this.executeSelectingPost(payload, Uri.updateExtremePhenomenon).then((response: ApiResponse) => {
            return response.isSuccess ? Promise.resolve(response.data) : Promise.reject(response.message);
        }).catch(error => Promise.reject(error))
    }

    updateExtremePhenomenon(payload: IExtremePhenomenon): Promise<ApiResponse> {
        return this.executeSelectingPut(payload, Uri.updateExtremePhenomenon).then((response: ApiResponse) => {
            return response.isSuccess ? Promise.resolve(response.data) : Promise.reject(response.message);
        }).catch(error => Promise.reject(error))
    }

    deleteExtremePhenomenon(id: string): Promise<ApiResponse> {
        const uri = Uri.getExtremePhenomenonById.replace(":id", id)
        return this.executeDeletingWith(id, uri).then((response: ApiResponse) => {
            return response.isSuccess ? Promise.resolve(response.data) : Promise.reject(response.message);
        }).catch(error => Promise.reject(error))
    }

    searchExtremePhenomenonDetail (payload: {provinceId: number, districtId: string, date: string}): Promise<ApiResponse> {
        return this.executeSelectingPost(payload, Uri.searchExtremePhenomenonDetail).then((response: ApiResponse) => {
            return response.isSuccess ? Promise.resolve(response.data) : Promise.reject(response.message);
        }).catch(error => Promise.reject(error))
    }
}
