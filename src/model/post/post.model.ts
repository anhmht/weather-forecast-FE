export default interface IPost {
    eventId: string;
    title: string;
    content: string;
    imageUrl: string;
    datePosted: string;
    statusId: string;
    categoryId: string;
    normalImageUrls?: string[];
    imageNormalDelete?: string[];
    imageNormalAdd?: string[];
}

export class Post implements IPost {
    eventId: string;
    title: string;
    content: string;
    imageUrl: string;
    datePosted: string;
    statusId: string;
    categoryId: string;
    normalImageUrls?: string[];
    imageNormalDelete?: string[];
    imageNormalAdd?: string[];

    constructor(option?: any) {
        this.eventId = option.eventId || null
        this.title = option.title || null
        this.content = option.content || null
        this.imageUrl = option.imageUrl || null
        this.datePosted = option.datePosted || null
        this.statusId = option.statusId || null
        this.categoryId = option.categoryId || null
        this.normalImageUrls = option.normalImageUrls || []
        this.imageNormalDelete = option.imageNormalDelete || []
        this.imageNormalAdd = option.imageNormalAdd || []
    }
}
