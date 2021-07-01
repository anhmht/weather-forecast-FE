import { IUserSearchParam } from './../../model/user/user-info.model';
import { ApiResponse } from "@/model/app-config";
import { GenericServices } from "../generic-service/generic.service";
import  Uri  from "@/constant/uri/user-constant";
import { IUser } from "@/model/user/user-authenticate.model";

export class UserServices extends GenericServices {
    checkLogin(loginInfo): Promise<ApiResponse> {
        return this.executeSelectingPost(loginInfo, Uri.login).then((response: ApiResponse) => {
            return Promise.resolve(response)
            }).catch(error => Promise.reject(error))
    }

    register(userInfo: IUser): Promise<ApiResponse> {
        return this.executeSelectingPost(userInfo, Uri.register).then((response: ApiResponse) => {
            return Promise.resolve(response)
        }).catch(error => Promise.reject(error))
    }

    updateInfo(userInfo: IUser): Promise<ApiResponse> {
        return this.executeSelectingPut(userInfo, Uri.updateUserInfo).then((response: ApiResponse) => {
            return Promise.resolve(response)
        }).catch(error => Promise.reject(error))
    }

    getAllUser(userSearchParam: IUserSearchParam): Promise<ApiResponse> {
        return this.executeSelectingPost(userSearchParam, Uri.getAllUser).then((response: ApiResponse) => {
            return Promise.resolve(response)
        }).catch(error => Promise.reject(error))
    }

    createUser(userInfo: IUser): Promise<ApiResponse> {
        return this.executeSelectingPost(userInfo, Uri.createUser).then((response: ApiResponse) => {
            return Promise.resolve(response)
        }).catch(error => Promise.reject(error))
    }
}
