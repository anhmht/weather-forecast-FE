import { UploadServices } from './../../../../service/upload-service/upload.service';
import { MAP_PROVINCE } from '@/constant/forcast-station-constant';
import Vue from "vue";
import Component from "vue-class-component";

@Component({
    template: require("./template.html").default,
})
export default class ListDataComponent extends Vue {
    model: any = {
        provinceId: null,
        name: null,
    };
    valid: boolean = true;
    rules = {
        provinceRules: [v => !!v || 'Vui lòng chọn tỉnh thành'],
    }
    uploadservice: UploadServices = new UploadServices();

    province: any = MAP_PROVINCE
    isUploading: boolean = false;
    progress: Number = 0;

    onChangeDocuments(files) {
        if (files.length > 0) {
            this.isUploading = true;
            this.progress = 0;
            this.uploadDocument({
                Data: files[0],
                FileName: `${new Date().getTime()}_${files[0].name}`,
            });
        }
    }

    uploadDocument(document) {
        const formData = this.buildUploadDocumentParams(document);
        document.isUploading = true;
        const config = {
            headers: {
                "content-type": "multipart/form-data"
            },
            onUploadProgress: function (progressEvent) {
                var value = (progressEvent.loaded * 100) / progressEvent.total;
                var percent = Math.round(value);
                this.progress = percent;
            }.bind(this)
        };
        this.uploadservice.uploadCSV(formData, config).then(response => {
            this.$toast.success('Tải dữ liệu thành công');
            this.isUploading = false;
            this.progress = 0;
        }).catch(err => {
            this.$toast.error('Có lỗi khi tải dữ liệu');
            this.isUploading = false;
            this.$errorMessage(err);
        });
    }

    buildUploadDocumentParams(document) {
        const formData = new FormData();
        formData.append('file', document.Data, document.FileName);
        formData.append('stationId', this.model.provinceId);
        const name = MAP_PROVINCE.find(x => x.id === this.model.provinceId).name
        formData.append('stationName', name);
        return formData;
    }

    upload() {
        //@ts-ignore
        this.valid = this.$refs.importForm.validate();
        if (this.valid) {
            const upload = this.$refs.upload as any;
            upload.click();
        }
    }

}
