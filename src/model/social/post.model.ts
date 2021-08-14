export default interface IPost {
    postId: string;
    content: string;
    imageUrls: string[];
    videoUrls: string[];
}

export class Post implements IPost {
    postId: string;
    content: string;
    imageUrls: string[];
    videoUrls: string[];

    constructor(option?: any) {
        this.postId = option.postId || null
        this.content = option.content || null
        this.imageUrls = option.imageUrls || []
        this.videoUrls = option.videoUrls || []
    }
}
