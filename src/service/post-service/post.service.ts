import { ApiResponse } from "@/model/app-config";
import { GenericServices } from "../generic-service/generic.service";
import Uri from "@/constant/uri/user-constant";
import IPost from "@/model/post/post.model";

export class PostServices extends GenericServices {
    createPost(postInfo: IPost): Promise<ApiResponse> {
        return this.executeSelectingPost(postInfo, Uri.post).then((response: ApiResponse) => {
            return Promise.resolve(response)
            }).catch(error => Promise.reject(error))
    }
}
