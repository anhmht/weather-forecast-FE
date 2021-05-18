export class ApiResponse<TResult = any> {
    isSuccess?: boolean;
    data?: string | TResult | TResult[] | null;
    message?: string;
    code?: number;
    extendData?: any;
    errorCode?: number;
    constructor(options: ApiResponse, header?: any) {
        if (options === null) options = { isSuccess: false };
        this.isSuccess = options.isSuccess;
        this.message = options.message;
        this.code = options.code;
        this.extendData = options.extendData;
        this.errorCode = options.errorCode;
        this.data = options.data || null;
    }
}
