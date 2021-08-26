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

export interface ISocialApprovalSearchParam {
    limit: number;
    page: number;
    statusIds?: number[];
}

export class SocialApprovalSearchParam implements ISocialApprovalSearchParam {
    limit: number;
    page: number;
    statusIds?: number[];

    constructor(option?: any) {
        this.limit = option.limit || 10;
        this.page = option.page || 1;
        this.statusIds = option.statusIds || [];
    }
}
