export interface ISocialPost {
    id?: string;
    content?: string;
    imageUrls?: string[];
    videoUrls?: string[];
}

export class SocialPost implements ISocialPost {
    id?: string;
    content: string;
    imageUrls: string[];
    videoUrls: string[];

    constructor(option?: any) {
        this.id = option.id || null
        this.content = option.content || ''
        this.imageUrls = option.imageUrls || []
        this.videoUrls = option.videoUrls || []
    }
}
