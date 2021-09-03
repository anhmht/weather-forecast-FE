export interface ISocialPost {
    actionIcons?: any;
    approvedByFullName?: string;
    approvedByUserName: string;
    comments?: any;
    content?: string;
    createBy?: string;
    createDate?: string;
    creatorAvatarUrl?: string;
    creatorFullName?: string;
    creatorShortName?: string;
    id?: string;
    listImageUrl?: any
    listVideoUrl?: any
    numberOfComment?: number
    publicDate?: string;
    shares?: string;
    statusId?: number;
    isShowComment?: boolean;
}

export class SocialPost implements ISocialPost {
    actionIcons?: any;
    approvedByFullName?: string;
    approvedByUserName: string;
    comments?: any;
    content?: string;
    createBy?: string;
    createDate?: string;
    creatorAvatarUrl?: string;
    creatorFullName?: string;
    creatorShortName?: string;
    id?: string;
    listImageUrl?: any
    listVideoUrl?: any
    numberOfComment?: number
    publicDate?: string;
    shares?: string;
    statusId?: number;
    isShowComment?: boolean;

    constructor(option?: ISocialPost) {
        this.actionIcons = option.actionIcons || null;
        this.approvedByFullName = option.approvedByFullName || null;
        this.approvedByUserName = option.approvedByUserName || null;
        this.comments = option.comments || null;
        this.content = option.content || null;
        this.createBy = option.createBy || null;
        this.createDate = option.createDate || null;
        this.creatorAvatarUrl = option.creatorAvatarUrl || null;
        this.creatorFullName = option.creatorFullName || null;
        this.creatorShortName = option.creatorShortName || null;
        this.id = option.id || null;
        this.listImageUrl = option.listImageUrl || null;
        this.listVideoUrl = option.listVideoUrl || null;
        this.numberOfComment = option.numberOfComment || 0;
        this.publicDate = option.publicDate || null;
        this.shares = option.shares || null;
        this.statusId = option.statusId || null;
        this.isShowComment = option.isShowComment || false;
    }
}