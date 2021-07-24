export interface IUserMisc {
    userId?: string;
    password?: string;
    confirmPassword?: string;
    code?: string;
}

export class UserMisc implements IUserMisc {
    userId?: string;
    password?: string;
    confirmPassword?: string;
    code?: string;

    constructor(option?: any) {
        this.userId = option.userId || null;
        this.password = option.password || null;
        this.confirmPassword = option.confirmPassword || null;
        this.code = option.code || null;
    }
}
