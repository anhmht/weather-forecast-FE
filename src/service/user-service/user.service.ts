import { IUserSearchParam } from '@/model/user/user-info.model';
import { ApiResponse } from "@/model/app-config";
import { GenericServices } from "../generic-service/generic.service";
import  Uri  from "@/constant/uri/user-constant";
import { IUser } from "@/model/user/user-authenticate.model";
import { IUserMisc } from '@/model/user/user-misc.model';

export class UserServices extends GenericServices {
    checkLogin(loginInfo): Promise<ApiResponse> {
        return super.executeSelectingPost(loginInfo, Uri.login).then((response: ApiResponse) => {
            return response.isSuccess ? Promise.resolve(response.data) : Promise.reject(response.message);
        }).catch(error => Promise.reject(error))
    }

    register(userInfo: IUser): Promise<ApiResponse> {
        return super.executeSelectingPost(userInfo, Uri.register).then((response: ApiResponse) => {
            return response.isSuccess ? Promise.resolve(response.data) : Promise.reject(response.message);
        }).catch(error => Promise.reject(error))
    }

    updateInfo(userInfo: IUser): Promise<ApiResponse> {
        return super.executeSelectingPut(userInfo, Uri.updateUserInfo).then((response: ApiResponse) => {
            return response.isSuccess ? Promise.resolve(response.data) : Promise.reject(response.message);
        }).catch(error => Promise.reject(error))
    }

    getAllUser(userSearchParam: IUserSearchParam): Promise<ApiResponse> {
        return super.executeSelectingPost(userSearchParam, Uri.getAllUser).then((response: ApiResponse) => {
            return response.isSuccess ? Promise.resolve(response.data) : Promise.reject(response.message);
        }).catch(error => Promise.reject(error))
    }

    createUser(userInfo: IUser): Promise<ApiResponse> {
        return super.executeSelectingPost(userInfo, Uri.createUser).then((response: ApiResponse) => {
            return response.isSuccess ? Promise.resolve(response.data) : Promise.reject(response.message);
        }).catch(error => Promise.reject(error))
    }

    getAllRole(): Promise<ApiResponse> {
        return super.executeSelecting(null, Uri.getAllRole).then((response: ApiResponse) => {
            return response.isSuccess ? Promise.resolve(response.data) : Promise.reject(response.message);
        }).catch(error => Promise.reject(error))
    }

    getUserInfo(): Promise<ApiResponse> {
        return super.executeSelecting(null, Uri.getUserInfo).then((response: ApiResponse) => {
            return response.isSuccess ? Promise.resolve(response.data) : Promise.reject(response.message);
        }).catch(error => Promise.reject(error))
    }
    
    forgotPassword(userInfo): Promise<ApiResponse> {
        return super.executeSelectingPost(userInfo, Uri.forgotPassword).then((response: ApiResponse) => {
            return response.isSuccess ? Promise.resolve(response.data) : Promise.reject(response.message);
        }).catch(error => Promise.reject(error))
    }

    resetPassword(userMisc: IUserMisc): Promise<ApiResponse> {
        return super.executeSelectingPost(userMisc, Uri.resetPassword).then((response: ApiResponse) => {
            return response.isSuccess ? Promise.resolve(response.data) : Promise.reject(response.message);
        }).catch(error => Promise.reject(error))
    }

    resendEmail(email: string): Promise<ApiResponse> {
        const uri = Uri.resendEmail + '?email=' + email;
        return super.executeSelectingPost({}, uri).then((response: ApiResponse) => {
            return response.isSuccess ? Promise.resolve(response.data) : Promise.reject(response.message);
        }).catch(error => Promise.reject(error))
    }

    confirmEmail(userMisc: IUserMisc): Promise<ApiResponse> {
        return super.executeSelectingPost(userMisc, Uri.confirmEmail).then((response: ApiResponse) => {
            return response.isSuccess ? Promise.resolve(response.data) : Promise.reject(response.message);
        }).catch(error => Promise.reject(error))
    }

    changePassword(userMisc: IUserMisc): Promise<ApiResponse> {
        return super.executeSelectingPost(userMisc, Uri.changePassword).then((response: ApiResponse) => {
            return response.isSuccess ? Promise.resolve(response.data) : Promise.reject(response.message);
        }).catch(error => Promise.reject(error))
    }
}
