export interface IUserSearchParam {
    limit?: number;
    page?: number;
}

export class UserSearchParam implements IUserSearchParam {
    limit?: number;
    page?: number;

    constructor() {
        this.limit = 10;
        this.page = 1;
    }
}
