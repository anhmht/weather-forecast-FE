import { IPostSearchParameter } from './../../model/post/post-filter.model';
import { ApiResponse } from "@/model/app-config";
import { GenericServices } from "../generic-service/generic.service";
import Uri from "@/constant/uri/post-consants";
import IPost from "@/model/post/post.model";

export class PostServices extends GenericServices {
    getPosts(searchParam: IPostSearchParameter): Promise<ApiResponse> {
        return this.executeSelectingPost(searchParam, Uri.getPosts).then((response: ApiResponse) => {
            return Promise.resolve(response)
        }).catch(error => Promise.reject(error))
    }

    getAllPosts(limit: number, page: number): Promise<ApiResponse> {
        return this.executeSelecting({limit, page}, Uri.post).then((response: ApiResponse) => {
            return Promise.resolve(response)
            }).catch(error => Promise.reject(error))
    }

    getPostById(id: string): Promise<ApiResponse> {
        const uri = Uri.postId.replace(":id", id)
        return this.executeSelecting(null, uri).then((response: ApiResponse) => {
            return Promise.resolve(response)
            }).catch(error => Promise.reject(error))
    }

    getPostByCategoryAndStatus(categoryId: string, statusId: string): Promise<ApiResponse> {
        return this.executeSelecting({categoryId, statusId}, Uri.postCategoryStatus).then((response: ApiResponse) => {
            return Promise.resolve(response)
            }).catch(error => Promise.reject(error))
    }

    getPostWithContent(categoryId: string, statusId: string): Promise<ApiResponse> {
        return this.executeSelecting({categoryId, statusId}, Uri.postWithContent).then((response: ApiResponse) => {
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

    deletePostById(id: string): Promise<ApiResponse> {
        const uri = Uri.postId.replace(":id", id)
        return this.executeDeletingWith(id, uri).then((response: ApiResponse) => {
            return Promise.resolve(response)
            }).catch(error => Promise.reject(error))
    }
}
