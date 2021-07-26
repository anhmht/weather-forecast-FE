import { ApiResponse } from "@/model/app-config";
import { GenericServices } from "../generic-service/generic.service";
import Uri from "@/constant/uri/post-consants";

export class CategoryServices extends GenericServices {
    getAllCategories(): Promise<ApiResponse> {
        return this.executeSelecting(null, Uri.category).then((response: ApiResponse) => {
            return response.isSuccess ? Promise.resolve(response.data) : Promise.reject(response.message);
        }).catch(error => Promise.reject(error))
    }

    getCategoryById(id: string): Promise<ApiResponse> {
        const uri = Uri.categoryId.replace(":id", id)
        return this.executeSelecting(null, uri).then((response: ApiResponse) => {
            return response.isSuccess ? Promise.resolve(response.data) : Promise.reject(response.message);
        }).catch(error => Promise.reject(error))
    }
}
