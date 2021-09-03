import { ApiResponse } from "@/model/app-config";
import { GenericServices } from "../generic-service/generic.service";
import Uri from "@/constant/uri/social-constant";
import { ISocialApprovalSearchParam, ISocialPost } from "@/model/social/post.model";
import { IComment } from "@/model/social/comment.model";

export class SocialServices extends GenericServices {
    createPost(post: ISocialPost): Promise<ApiResponse> {
        return this.executeSelectingPost(post, Uri.createPost).then((response: ApiResponse) => {
            return response.isSuccess ? Promise.resolve(response.data) : Promise.reject(response.message);
            }).catch(error => Promise.reject(error))
    }

    editPost(post: ISocialPost): Promise<ApiResponse> {
        return this.executeSelectingPut(post, Uri.editPost).then((response: ApiResponse) => {
            return response.isSuccess ? Promise.resolve(response.data) : Promise.reject(response.message);
            }).catch(error => Promise.reject(error))
    }

    createComment(comment: IComment): Promise<ApiResponse> {
        return this.executeSelectingPost(comment, Uri.createComment).then((response: ApiResponse) => {
            return response.isSuccess ? Promise.resolve(response.data) : Promise.reject(response.message);
            }).catch(error => Promise.reject(error))
    }

    approvePost(id: string): Promise<ApiResponse> {
        const uri = Uri.approvePost.replace(":id", id)
        return this.executeSelectingPut(null, uri).then((response: ApiResponse) => {
            return response.isSuccess ? Promise.resolve(response.data) : Promise.reject(response.message);
            }).catch(error => Promise.reject(error))
    }

    approveComment(id: string): Promise<ApiResponse> {
        const uri = Uri.approveComment.replace(":id", id)
        return this.executeSelectingPut(null, uri).then((response: ApiResponse) => {
            return response.isSuccess ? Promise.resolve(response.data) : Promise.reject(response.message);
            }).catch(error => Promise.reject(error))
    }

    changePostStatus(id: string, statusId: string): Promise<ApiResponse> {
        const uri = Uri.changePostStatus.replace(":id", `${id}&statusId=${statusId}`)
        return this.executeSelectingPut(null, uri).then((response: ApiResponse) => {
            return response.isSuccess ? Promise.resolve(response.data) : Promise.reject(response.message);
            }).catch(error => Promise.reject(error))
    }

    changeCommentStatus(id: string, statusId: string): Promise<ApiResponse> {
        const uri = Uri.changeCommentStatus.replace(":id", `${id}&statusId=${statusId}`)
        return this.executeSelectingPut(null, uri).then((response: ApiResponse) => {
            return response.isSuccess ? Promise.resolve(response.data) : Promise.reject(response.message);
            }).catch(error => Promise.reject(error))
    }

    updateComment(comment: IComment): Promise<ApiResponse> {
        return this.executeSelectingPut(comment, Uri.updateComment).then((response: ApiResponse) => {
            return response.isSuccess ? Promise.resolve(response.data) : Promise.reject(response.message);
            }).catch(error => Promise.reject(error))
    }

    addReactionToPost(id: string, iconId: number): Promise<ApiResponse> {
        return this.executeSelectingPost({id, iconId}, Uri.addReactionToPost).then((response: ApiResponse) => {
            return response.isSuccess ? Promise.resolve(response.data) : Promise.reject(response.message);
            }).catch(error => Promise.reject(error))
    }

    addReactionToComment(id: string, iconId: number): Promise<ApiResponse> {
        return this.executeSelectingPost({id, iconId}, Uri.addReactionToComment).then((response: ApiResponse) => {
            return response.isSuccess ? Promise.resolve(response.data) : Promise.reject(response.message);
            }).catch(error => Promise.reject(error))
    }

    removeReactionFromPost(id: string): Promise<ApiResponse> {
        const uri = Uri.removeReactionFromPost.replace(":id", id)
        return this.executeDeletingWith(id, uri).then((response: ApiResponse) => {
            return response.isSuccess ? Promise.resolve(response.data) : Promise.reject(response.message);
            }).catch(error => Promise.reject(error))
    }

    removeReactionFromComment(id: string): Promise<ApiResponse> {
        const uri = Uri.removeReactionFromComment.replace(":id", id)
        return this.executeDeletingWith(id, uri).then((response: ApiResponse) => {
            return response.isSuccess ? Promise.resolve(response.data) : Promise.reject(response.message);
            }).catch(error => Promise.reject(error))
    }

    sharePost(id: string, shareTo: string): Promise<ApiResponse> {
        return this.executeSelectingPost({id, shareTo}, Uri.sharePost).then((response: ApiResponse) => {
            return response.isSuccess ? Promise.resolve(response.data) : Promise.reject(response.message);
            }).catch(error => Promise.reject(error))
    }

    getListPosts(limit: number, page: number, commentLimit: number): Promise<ApiResponse> {
        return this.executeSelectingPost({limit, page, commentLimit}, Uri.getListPosts).then((response: ApiResponse) => {
            return response.isSuccess ? Promise.resolve(response.data) : Promise.reject(response.message);
            }).catch(error => Promise.reject(error))
    }

    getListPostsUser(limit: number, page: number, commentLimit: number): Promise<ApiResponse> {
        return this.executeSelectingPost({limit, page, commentLimit}, Uri.getListPostsUser).then((response: ApiResponse) => {
            return response.isSuccess ? Promise.resolve(response.data) : Promise.reject(response.message);
            }).catch(error => Promise.reject(error))
    }

    getPostById(id: string): Promise<ApiResponse> {
        const uri = Uri.getPostById.replace(":id", id)
        return this.executeSelecting(null, uri).then((response: ApiResponse) => {
            return response.isSuccess ? Promise.resolve(response.data) : Promise.reject(response.message);
            }).catch(error => Promise.reject(error))
    }

    deletePost(id: string): Promise<ApiResponse> {
        const uri = Uri.deletePost.replace(":id", id)
        return this.executeDeletingWith(id, uri).then((response: ApiResponse) => {
            return response.isSuccess ? Promise.resolve(response.data) : Promise.reject(response.message);
            }).catch(error => Promise.reject(error))
    }

    deleteComment(id: string): Promise<ApiResponse> {
        const uri = Uri.deleteComment.replace(":id", id)
        return this.executeDeletingWith(id, uri).then((response: ApiResponse) => {
            return response.isSuccess ? Promise.resolve(response.data) : Promise.reject(response.message);
            }).catch(error => Promise.reject(error))
    }

    getListCommentsByPost(limit: number, page: number, postId: string): Promise<ApiResponse> {
        return this.executeSelectingPost({limit, page, postId}, Uri.getListCommentsAdmin).then((response: ApiResponse) => {
            return response.isSuccess ? Promise.resolve(response.data) : Promise.reject(response.message);
            }).catch(error => Promise.reject(error))
    }
    getListSubComments(limit: number, page: number, commentId: string): Promise<ApiResponse> {
        return this.executeSelectingPost({ limit, page, commentId }, Uri.getListSubComments).then((response: ApiResponse) => {
            return response.isSuccess ? Promise.resolve(response.data) : Promise.reject(response.message);
            }).catch(error => Promise.reject(error))
    }

    getListCommentsUser(limit: number, page: number): Promise<ApiResponse> {
        return this.executeSelectingPost({limit, page}, Uri.getListCommentsUser).then((response: ApiResponse) => {
            return response.isSuccess ? Promise.resolve(response.data) : Promise.reject(response.message);
            }).catch(error => Promise.reject(error))
    }

    getPostForApproval(payload: ISocialApprovalSearchParam): Promise<ApiResponse> {
        return this.executeSelectingPost(payload, Uri.getPostForApproval).then((response: ApiResponse) => {
            return response.isSuccess ? Promise.resolve(response.data) : Promise.reject(response.message);
            }).catch(error => Promise.reject(error))
    }

    getCommentForApproval(payload: ISocialApprovalSearchParam): Promise<ApiResponse> {
        return this.executeSelectingPost(payload, Uri.getCommentForApproval).then((response: ApiResponse) => {
            return response.isSuccess ? Promise.resolve(response.data) : Promise.reject(response.message);
            }).catch(error => Promise.reject(error))
    }

    getPostDetailForApproval(id: string): Promise<ApiResponse> {
        const uri = Uri.getPostDetailForApproval.replace(":id", id)
        return this.executeSelecting(null, uri).then((response: ApiResponse) => {
            return response.isSuccess ? Promise.resolve(response.data) : Promise.reject(response.message);
            }).catch(error => Promise.reject(error))
    }

    getCommentDetailForApproval(id: string): Promise<ApiResponse> {
        const uri = Uri.getCommentDetailForApproval.replace(":id", id)
        return this.executeSelecting(null, uri).then((response: ApiResponse) => {
            return response.isSuccess ? Promise.resolve(response.data) : Promise.reject(response.message);
            }).catch(error => Promise.reject(error))
    }
}
