export interface IUserMisc {
    userId?: string;
    password?: string;
    currentPassword?: string;
    newPassword?: string;
    confirmPassword?: string;
    code?: string;
}

export class UserMisc implements IUserMisc {
    userId?: string;
    password?: string;
    currentPassword?: string;
    newPassword?: string;
    confirmPassword?: string;
    code?: string;

    constructor(option?: any) {
        this.userId = option.userId || null;
        this.password = option.password || null;
        this.currentPassword = option.currentPassword || null;
        this.newPassword = option.newPassword || null;
        this.confirmPassword = option.confirmPassword || null;
        this.code = option.code || null;
    }
}
