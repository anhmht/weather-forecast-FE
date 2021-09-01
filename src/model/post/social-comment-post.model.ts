export interface IPostComment{
    actionIcons ?: any;
    approvedByFullName ?: string;
    approvedByUserName: string;
    content ?: string;
    createBy ?: string;
    createDate ?: string;
    creatorAvatarUrl ?: string;
    creatorFullName ?: string;
    creatorShortName ?: string;
    id ?: string;
    listImageUrl ?: any
    listVideoUrl ?: any
    numberOfSubComment ?: number
    publicDate ?: string;
    parentCommentId?: string;
    postId?: string;
    statusId ?: number;
    isShowSubComment ?: boolean;
}

export class PostComment implements IPostComment {
    actionIcons?: any;
    approvedByFullName?: string;
    approvedByUserName: string;
    content?: string;
    createBy?: string;
    createDate?: string;
    creatorAvatarUrl?: string;
    creatorFullName?: string;
    creatorShortName?: string;
    id?: string;
    listImageUrl?: any
    listVideoUrl?: any
    numberOfSubComment?: number
    publicDate?: string;
    parentCommentId?: string;
    postId?: string;
    statusId?: number;
    isShowSubComment?: boolean;
    
    constructor(option?: IPostComment) {
        this.actionIcons = option.actionIcons || null;
        this.approvedByFullName = option.approvedByFullName || null;
        this.approvedByUserName = option.approvedByUserName || null;
        this.content = option.content || null;
        this.createBy = option.createBy || null;
        this.createDate = option.createDate || null;
        this.creatorAvatarUrl = option.creatorAvatarUrl || null;
        this.creatorFullName = option.creatorFullName || null;
        this.creatorShortName = option.creatorShortName || null;
        this.id = option.id || null;
        this.listImageUrl = option.listImageUrl || null;
        this.listVideoUrl = option.listVideoUrl || null;
        this.numberOfSubComment = option.numberOfSubComment || 0;
        this.publicDate = option.publicDate || null;
        this.parentCommentId = option.parentCommentId || null;
        this.postId = option.postId || null;
        this.statusId = option.statusId || null;
        this.isShowSubComment = option.isShowSubComment || false;
    }
}