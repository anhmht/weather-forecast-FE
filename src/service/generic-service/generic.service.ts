import axios, { AxiosPromise } from "axios";
export class GenericServices {
    protected executeSelecting<TValue, TResult>(
        params?: TValue,
        path?: string,
        encodeURI: boolean = false
    ): AxiosPromise<TResult> {
        var uri = encodeURI ? encodeURIComponent(path) : path;
        return axios
            .get(uri, { params })
            .then(response => response.data)
            .catch(error => error);
    }

    protected executeSelectingPost<TValue, TResult>(
        value: TValue,
        path?: string,
        config?: any
    ): AxiosPromise<TResult> {
        return axios
            .post(path, value, config)
            .then(response => response.data)
            .catch(error => {
                console.log(error);
            });
    }

    protected executeDeleting<TResult>(path?: string): AxiosPromise<TResult> {
        return axios
            .delete(path)
            .then(response => response.data)
            .catch(error => error);
    }
    protected executeDeletingWith<TResult>(
        value,
        path?: string
    ): AxiosPromise<TResult> {
        return axios
            .delete(path, { data: value })
            .then(response => response.data)
            .catch(error => error);
    }
}
