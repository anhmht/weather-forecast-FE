import { IPostSearchParameter } from './../../model/post/post-filter.model';
import { ApiResponse } from "@/model/app-config";
import { GenericServices } from "../generic-service/generic.service";
import Uri from "@/constant/uri/post-consants";
import IPost from "@/model/post/post.model";
import { CATEGORY_IDS, CATEGORY_NAMES } from '@/constant/route-constant';

export class PostServices extends GenericServices {
    getPosts(searchParam: IPostSearchParameter): Promise<ApiResponse> {
        return this.executeSelectingPost(searchParam, Uri.getPosts).then((response: ApiResponse) => {
            return response.isSuccess ? Promise.resolve(response.data) : Promise.reject(response.message);
        }).catch(error => Promise.reject(error))
    }

    getAllPosts(limit: number, page: number): Promise<ApiResponse> {
        return this.executeSelecting({limit, page}, Uri.post).then((response: ApiResponse) => {
            return response.isSuccess ? Promise.resolve(response.data) : Promise.reject(response.message);
            }).catch(error => Promise.reject(error))
    }

    getPostById(id: string): Promise<ApiResponse> {
        const uri = Uri.postId.replace(":id", id)
        return this.executeSelecting(null, uri).then((response: ApiResponse) => {
            return response.isSuccess ? Promise.resolve(response.data) : Promise.reject(response.message);
            }).catch(error => Promise.reject(error))
    }

    getPostByCategoryAndStatus(categoryId: string, statusId: string): Promise<ApiResponse> {
        return this.executeSelecting({categoryId, statusId}, Uri.postCategoryStatus).then((response: ApiResponse) => {
            return response.isSuccess ? Promise.resolve(response.data) : Promise.reject(response.message);
            }).catch(error => Promise.reject(error))
    }

    getPostWithContent(categoryId: string, statusId: string): Promise<ApiResponse> {
        return this.executeSelecting({categoryId, statusId}, Uri.postWithContent).then((response: ApiResponse) => {
            return response.isSuccess ? Promise.resolve(response.data) : Promise.reject(response.message);
            }).catch(error => Promise.reject(error))
    }

    createPost(postInfo: IPost): Promise<ApiResponse> {
        return this.executeSelectingPost(postInfo, Uri.post).then((response: ApiResponse) => {
            return response.isSuccess ? Promise.resolve(response.data) : Promise.reject(response.message);
            }).catch(error => Promise.reject(error))
    }

    editPost(postInfo: IPost): Promise<ApiResponse> {
        return this.executeSelectingPut(postInfo, Uri.post).then((response: ApiResponse) => {
            return response.isSuccess ? Promise.resolve(response.data) : Promise.reject(response.message);
            }).catch(error => Promise.reject(error))
    }

    deletePostById(id: string): Promise<ApiResponse> {
        const uri = Uri.postId.replace(":id", id)
        return this.executeDeletingWith(id, uri).then((response: ApiResponse) => {
            return response.isSuccess ? Promise.resolve(response.data) : Promise.reject(response.message);
            }).catch(error => Promise.reject(error))
    }

    getPostsByCategory(categoryType: string, searchParam: IPostSearchParameter): Promise<ApiResponse> {

        let url: string = null;
        switch (categoryType) {
            case CATEGORY_NAMES.LIST_POST_WEATHER_NEWS:
            case CATEGORY_NAMES.LIST_POST_WEATHER_MAP:
                url = Uri.getPosts;
                break;
            case CATEGORY_NAMES.LIST_POST_CANH_BAO_THIEN_TAI:
                url = Uri.disasterWarning;
                break;
            case CATEGORY_NAMES.LIST_POST_THONG_TIN_KHUYEN_CAO:
                url = Uri.recommendedInformation;
                break;
            case CATEGORY_NAMES.LIST_POST_KT_VH_XH:
                url = Uri.socioculturalEngineering;
                break;
            case CATEGORY_NAMES.LIST_POST_THOI_TIET_DU_LICH:
                url = Uri.travelWeather;
                break;
            case CATEGORY_NAMES.LIST_POST_THOI_TIET_NONG_VU:
                url = Uri.agriculturalWeather;
                break;
            case CATEGORY_NAMES.LIST_POST_THOI_TIET_GIAO_THONG:
                url = Uri.trafficWeather;
                break;
            case CATEGORY_NAMES.LIST_POST_THOI_TIET_NGUY_HIEM:
                url = Uri.dangerousWeather;
                break;
            case CATEGORY_NAMES.LIST_POST_THUY_VAN:
                url = Uri.hydrological;
                break;
            case CATEGORY_NAMES.LIST_POST_TRANG_THAI_THOI_TIET:
                url = Uri.weatherStates;
                break;
            default:
                break;
        }
        if (url) {
            return this.executeSelectingPost(searchParam, url).then((response: ApiResponse) => {
                return response.isSuccess ? Promise.resolve(response.data) : Promise.reject(response.message);
            }).catch(error => Promise.reject(error))
        } else {
            return Promise.reject('NOT FOUND THE POST LIST')
        }
    }
}
