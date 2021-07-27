
export interface IUserState  {
    auth?: Object;
}

export class UserState implements IUserState {
    auth?: Object;
    constructor(options: IUserState) {
        this.auth = options.auth || null;
    }
}
