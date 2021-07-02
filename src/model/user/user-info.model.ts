export interface IUserSearchParam {
    limit: number;
    page: number;
    roleIds?: string[];
}

export class UserSearchParam implements IUserSearchParam {
    limit: number;
    page: number;
    roleIds?: string[];

    constructor(option?: any) {
        this.limit = option.limit || 10;
        this.page = option.page || 1;
        this.roleIds = option.roleIds || [];
    }
}
