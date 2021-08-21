export default interface IComment {
    postId: string;
    content: string;
    parentCommentId: string;
    imageUrls: string[];
    videoUrls: string[];
    anonymousUser: {
        fullName: string,
        phone: string,
        email: string
    }
}

export class Comment implements IComment {
    postId: string;
    content: string;
    parentCommentId: string;
    imageUrls: string[];
    videoUrls: string[];
    anonymousUser: {
        fullName: string,
        phone: string,
        email: string
    }

    constructor(option?: any) {
        this.postId = option.postId || null
        this.content = option.content || null
        this.parentCommentId = option.parentCommentId || null
        this.imageUrls = option.imageUrls || []
        this.videoUrls = option.videoUrls || []
        this.anonymousUser = option.anonymousUser || {}
    }
}
