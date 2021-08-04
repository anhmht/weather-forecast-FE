import { BASE_URL } from '../../../constant/env-constant';
import Uri from '../../../constant/uri/upload-constants';
import { UploadServices } from '@/service/upload-service/upload.service';

export class UploadAdapter {
    loader: any;
    url: string;
    uploadservice: UploadServices = new UploadServices();
    constructor(loader) {
        // CKEditor 5's FileLoader instance.
        this.loader = loader;
        // URL where to send files.
        this.url = `${BASE_URL}${Uri.uploadImage}`;
    }

    // Starts the upload process.
    upload() {
        let upload = new Promise((resolve, reject) => {
            this.loader['file'].then((data) => {
                const formData = this.buildUploadDocumentParams(data, data.name);
                const config = {
                    headers: { "content-type": "multipart/form-data" },
                };
                this.uploadservice.upload(formData, config).then(response => {
                    resolve({ default: response });
                }).catch(err => {
                    reject(err)
                });
            });
        });
        return upload;
    }
    // Aborts the upload process.
    abort() {
        console.log('abort');
    }

    buildUploadDocumentParams(document, name) {
        const formData = new FormData();
        formData.append('file', document, name);
        return formData;
    }
}

export function MyCustomUploadAdapterPlugin(editor) {
    editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
        // Configure the URL to the upload script in your back-end here!
        return new UploadAdapter(loader);
    };
}
