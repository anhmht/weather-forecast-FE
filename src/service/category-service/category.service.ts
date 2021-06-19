import { ApiResponse } from "@/model/app-config";
import { GenericServices } from "../generic-service/generic.service";
import Uri from "@/constant/uri/user-constant";

export class CategoryServices extends GenericServices {
    getAllCategories(): Promise<ApiResponse> {
        return this.executeSelecting(null, Uri.category).then((response: ApiResponse) => {
            return Promise.resolve(response)
        }).catch(error => Promise.reject(error))
    }

    getCategoryById(id: string): Promise<ApiResponse> {
        const uri = Uri.categoryId.replace(":id", id)
        return this.executeSelecting(null, uri).then((response: ApiResponse) => {
            return Promise.resolve(response)
        }).catch(error => Promise.reject(error))
    }
}
