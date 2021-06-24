import { ApiResponse } from "@/model/app-config";
import { GenericServices } from "../generic-service/generic.service";
import Uri from "@/constant/uri/media-constants";

export class MediaServices extends GenericServices {
    generateQRCode(clientId: string): Promise<ApiResponse> {
        return this.executeSelecting({ text: clientId}, Uri.generateQRCode).then((response: ApiResponse) => {
            return Promise.resolve(response)
        }).catch(error => Promise.reject(error))
    }
}
