import Vue from "vue";
import Component from "vue-class-component";
import NO_IMAGE from '../../../../../static/img/no-image/no-image.png';

@Component({
    template: require("./template.html").default,
})
export default class ListIconComponent extends Vue {
    totalItems: number = 100;
    totalPages: number = 15;
    currentPage: number = 1;
    limitPerPage: number[] = [5, 10, 15, 20];
    pageSize: number = 10;
    numPostsInPage: number = 20;
    isDisplayDialog: boolean = false;
    uploadedDocs: any = NO_IMAGE;
    progress: number = 0;
    dialogTitle: string = "";
    dialogButton: string = "";

    get TotalPageVisible() {
        if (this.totalPages < 7)
            return this.totalPages
        else
            return 7
    }

    icons: any = [
        {
            imageUrl: 'https://weatherstoragevn.blob.core.windows.net/images/icons/0001.png',
            name: "Quang mây, không mưa",
            type: "Quang mây"
        },
        {
            imageUrl: 'https://weatherstoragevn.blob.core.windows.net/images/icons/0001.png',
            name: "Quang mây, không mưa",
            type: "Quang mây"
        },
        {
            imageUrl: 'https://weatherstoragevn.blob.core.windows.net/images/icons/0001.png',
            name: "Quang mây, không mưa",
            type: "Quang mây"
        },
        {
            imageUrl: 'https://weatherstoragevn.blob.core.windows.net/images/icons/0001.png',
            name: "Quang mây, không mưa",
            type: "Quang mây"
        },
        {
            imageUrl: 'https://weatherstoragevn.blob.core.windows.net/images/icons/0001.png',
            name: "Quang mây, không mưa",
            type: "Quang mây"
        }
    ];

    type: any = [
        {
            name: "Quang mây",
            typeId: 1
        },
        {
            name: "Nắng nóng",
            typeId: 2
        },
        {
            name: "Mưa dông",
            typeId: 3
        },
    ];

    rules = {
        nameRules: [v => !!v || 'Vui lòng nhập tên biểu tượng'],
        typeRules: [v => !!v || 'Vui lòng chọn loại biểu tượng']
    }

    toCreateIcon() {
        this.isDisplayDialog = true;
        this.dialogTitle = "Tạo biểu tượng";
        this.dialogButton = "Tạo";
    }

    editPost(id) {
        this.isDisplayDialog = true;
        this.dialogTitle = "Sửa biểu tượng";
        this.dialogButton = "Sửa";
    }
}
