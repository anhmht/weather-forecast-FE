import Vue from "vue";
import Component from "vue-class-component";
import { Post } from "@/model/post";
import IPost from "@/model/post/post.model";
import ICategory from '@/model/category/category.model';

@Component({
    template: require("./template.html").default,
    components: {
        "custom-ckeditor": () => import("../../../../components/ckeditor"),
    }
})
export default class CreateDocumentComponent extends Vue {
    documents: any = [];
    isLoading: boolean = false;
    valid: boolean = true;

    postModel: IPost = new Post({});

    category: ICategory[] = []

    rules = {
        title: [v => !!v || 'Vui lòng nhập tiêu đề'],
        statusRules: [v => !!v || 'Vui lòng chọn trạng thái'],
        categoryRules: [v => !!v || 'Vui lòng chọn danh mục']
    }

    handleBack() {
        this.$router.go(-1);
    }

    browse() {

    }

    deleteDocument(documentId) {

    }

    createDocument() {
        
    }

    async mounted() {
        
    }
}
