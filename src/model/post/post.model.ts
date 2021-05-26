export default interface IPost {
    eventId: string;
    title: string;
    content: string;
    imageUrl: string;
    datePosted: string;
    status: Number;
    categoryId: string;
}

export class Post implements IPost {
    eventId: string;
    title: string;
    content: string;
    imageUrl: string;
    datePosted: string;
    status: Number;
    categoryId: string;

    constructor(option?: any) {
        this.eventId = option.eventId || null
        this.title = option.title || null
        this.content = option.content || null
        this.imageUrl = option.imageUrl || null
        this.datePosted = option.datePosted || null
        this.status = option.status || null
        this.categoryId = option.categoryId || null

    }
}