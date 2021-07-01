export interface IUser {
    id?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    userName?: string;
    password?: string;
    avatarUrl?: string;
    phoneNumber?: string;
    roleNames?: string[];
}

export class User implements IUser {
    id?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    userName?: string;
    password?: string;
    avatarUrl?: string;
    phoneNumber?: string;
    roleNames?: string[];

    constructor(option?: any) {
        this.id = option.id || null;
        this.firstName = option.firstName || null
        this.lastName = option.lastName || null
        this.email = option.email || null
        this.userName = option.userName || null
        this.password = option.password || null
        this.avatarUrl = option.avatarUrl || null
        this.phoneNumber = option.phoneNumber || null
        this.roleNames = option.roleNames || []
    }
}
