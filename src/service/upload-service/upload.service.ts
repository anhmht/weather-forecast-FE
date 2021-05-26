import { GenericServices } from "../generic-service/generic.service"
import Uri from "@/constant/uri/upload-constants";
import axios from 'axios';

export class UploadServices extends GenericServices {
    CancelToken = axios.CancelToken;
    cancels: any = [];

    upload(formData, config, id = null) {
        return this.executeSelectingPost(formData, Uri.uploadImage, {
            ...config, cancelToken: new this.CancelToken((c) => {
                // An executor function receives a cancel function as a parameter
                this.cancels.push({ cancel: c, id });
            })
        })
            .then((response: any) => {
                const index = this.cancels.findIndex(x => x.id === id);
                this.cancels.splice(index, 1);
                return Promise.resolve(response.url);
            })
            .catch(ex => {
                const index = this.cancels.findIndex(x => x.id === id);
                this.cancels.splice(index, 1);
                if (axios.isCancel(ex)) {
                    console.log('Request canceled', ex.message);
                } else {
                    // handle error
                    console.log(ex)
                    return Promise.reject(ex)
                }
            });
    }


}
