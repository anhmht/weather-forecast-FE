import { ApiResponse } from "@/model/app-config";
import { AxiosRequestConfig, AxiosResponse } from "axios";

export interface IAxiosConfigurationHelper {
    axiosResponseHandler(config: AxiosResponse);
    axiosUnauthorizedResponseHandler(config: AxiosRequestConfig);
    axiosValidResponseHandler(config: AxiosRequestConfig);
    axiosInternalExceptionResponseHandler(config: AxiosResponse);
    axiosNotFoundResponseHandler(config);
}

export class AxiosConfigurationHelper implements IAxiosConfigurationHelper {
    
    axiosResponseHandler(response: AxiosResponse) {
        switch (response.status) {
            case 200:
            case 201:
            case 204:
                response.data = new ApiResponse(
                    { isSuccess: true, data: response.data },
                    response.headers
                );
                break;
            case 400:
                response.data = new ApiResponse({
                    isSuccess: false,
                    data: response.data,
                    code: response.status,
                    message: response.statusText
                });
                break;
            case 401:
            case 404:
                response.data = new ApiResponse({
                    isSuccess: false,
                    data: null,
                    code: response.status,
                    message: response.statusText
                });
                break;
            case 500:
                response.data = new ApiResponse({
                    isSuccess: false,
                    data: response.data,
                    code: response.data.code, //1000
                    message: response.data.msg //
                });
                break;
            case 501:
            case 502:
            case 503:
                break;
            default:
                break;
        }
        return response;
    }

    axiosValidResponseHandler(response: AxiosResponse) {
        return response;
    }
    axiosInternalExceptionResponseHandler(response: AxiosResponse) {
        return response;
    }
    axiosNotFoundResponseHandler(response) {
        return new ApiResponse({
            isSuccess: false,
            data: null,
            message: response
        });
    }

    axiosUnauthorizedResponseHandler(response: AxiosResponse): ApiResponse {
        return new ApiResponse({
            isSuccess: false,
            code: response.data.Code,
            message: response.data.Details
        });
    }
}