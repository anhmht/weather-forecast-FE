import { ApiResponse } from "@/model/app-config";
import { GenericServices } from "../generic-service/generic.service";
import Uri from "@/constant/uri/user-constant";
import IPost from "@/model/post/post.model";

export class PostServices extends GenericServices {
    getAllPosts(): Promise<ApiResponse> {
        return this.executeSelecting("", Uri.post).then((response: ApiResponse) => {
            return Promise.resolve(response)
            }).catch(error => Promise.reject(error))
    }

    getPostById(id: string): Promise<ApiResponse> {
        const uri = Uri.postId.replace(":id", id)
        return this.executeSelecting(null, uri).then((response: ApiResponse) => {
            return Promise.resolve(response)
            }).catch(error => Promise.reject(error))
    }

    createPost(postInfo: IPost): Promise<ApiResponse> {
        return this.executeSelectingPost(postInfo, Uri.post).then((response: ApiResponse) => {
            return Promise.resolve(response)
            }).catch(error => Promise.reject(error))
    }

    editPost(postInfo: IPost): Promise<ApiResponse> {
        return this.executeSelectingPut(postInfo, Uri.post).then((response: ApiResponse) => {
            return Promise.resolve(response)
            }).catch(error => Promise.reject(error))
    }

    getPostCategory(): Promise<ApiResponse> {
        return this.executeSelecting(null, Uri.category).then((response: ApiResponse) => {
            return Promise.resolve(response)
        }).catch(error => Promise.reject(error))
    }
}
