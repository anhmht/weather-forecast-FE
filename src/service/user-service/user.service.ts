import { ApiResponse } from "@/model/app-config";
import { GenericServices } from "../generic-service/generic.service";
import  Uri  from "@/constant/uri/user-constant";
import IUser from "@/model/user/user-authenticate.model";

export class UserServices extends GenericServices {
    checkLogin(loginInfo) {
        return this.executeSelectingPost(loginInfo, Uri.login).then((response: ApiResponse) => {
                return response.isSuccess
                    ? Promise.resolve(response.data)
                    : Promise.reject(response)
            }).catch(error => Promise.reject(error))
    }

    register(userInfo : IUser) {
        return this.executeSelectingPost(userInfo, Uri.login).then((response: ApiResponse) => {
            return response.isSuccess
                ? Promise.resolve(response.data)
                : Promise.reject(response)
        }).catch(error => Promise.reject(error))
    }
}
