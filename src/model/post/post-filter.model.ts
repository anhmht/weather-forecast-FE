export interface IPostSearchParameter {
    limit: number;
    page: number;
    categoryId?: string;
    statusId?: string;
}

export class PostSearchParameter implements IPostSearchParameter {
    limit: number;
    page: number;
    categoryId?: string;
    statusId?: string;

    constructor(option?: any) {
        this.limit = option.limit || 5;
        this.page = option.page || 1;
        this.categoryId = option.categoryId || null;
        this.statusId = option.statusId || null;
    }
}
