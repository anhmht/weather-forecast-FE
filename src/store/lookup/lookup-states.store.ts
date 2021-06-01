
export interface ILookupState  {
    storedlookupObject?: Object;
}

export class LookupState implements ILookupState {
    storedlookupObject?: Object;
    constructor(options: ILookupState) {
        this.storedlookupObject = options.storedlookupObject || {};
    }
}
