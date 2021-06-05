export default interface IPost {
    eventId: string;
    title: string;
    content: string;
    imageUrl: string;
    datePosted: string;
    statusId: string;
    categoryId: string;
    imageNormalUrls?: string[];
    imageNormalDeletes?: string[];
    imageNormalAdds?: string[];
}

export class Post implements IPost {
    eventId: string;
    title: string;
    content: string;
    imageUrl: string;
    datePosted: string;
    statusId: string;
    categoryId: string;
    imageNormalUrls?: string[];
    imageNormalDeletes?: string[];
    imageNormalAdds?: string[];

    constructor(option?: any) {
        this.eventId = option.eventId || null
        this.title = option.title || null
        this.content = option.content || null
        this.imageUrl = option.imageUrl || null
        this.datePosted = option.datePosted || null
        this.statusId = option.statusId || null
        this.categoryId = option.categoryId || null
        this.imageNormalUrls = option.imageNormalUrls || []
        this.imageNormalDeletes = option.imageNormalDeletes || []
        this.imageNormalAdds = option.imageNormalAdds || []
    }
}
