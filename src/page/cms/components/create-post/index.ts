import Vue from "vue";
import Component from "vue-class-component";
import CKEditor from '@ckeditor/ckeditor5-vue2';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { PostServices } from '../../../../service/post-service/post.service';
import IPost from "../../../../model/post/post.model";
import { PATH } from '@/constant/route-constant';

@Component({
    template: require("./template.html").default,
    components: {
        ckeditor: CKEditor.component
    }
})
export default class CreatePostComponent extends Vue {
    postService: PostServices = new PostServices();
    valid: boolean = true;

    CKEditorOptions: any = {
        editor: ClassicEditor,
        // editorData: "",
        /* editorData: `<p>TIN CẢNH BÁO MƯA DÔNG TRÊN CÁC VÙNG BIỂN PHÍA NAM</p>
                    <p>Hiện nay (23/5): Rãnh áp thấp có trục ở khoảng 10-12 độ Vĩ Bắc. 
                    Gió mùa Tây Nam đang hoạt động mạnh dần lên.</p>
                    <p>Dự báo: Do ảnh hưởng của rãnh áp thấp phân tích trên kết hợp với hoạt động của gió mùa Tây Nam 
                    nên ngày và đêm nay (23/5), ở vùng biển từ Bình Thuận đến Cà Mau có gió Tây Nam mạnh cấp 5, 
                    có lúc cấp 6, giật cấp 7-8, biển động; sóng biển cao từ 1,5-3,0m.</p>
                    <p>Khu vực giữa và Nam Biển Đông (bao gồm cả vùng biển quần đảo Trường Sa), 
                    vùng biển từ Bình Định đến Cà Mau, từ Cà Mau đến Kiên Giang và vịnh Thái Lan 
                    có mưa rào và dông. Trong mưa dông có khả năng xảy ra lốc xoáy và gió giật mạnh. </p>
                    <p>Cảnh báo cấp độ rủi ro thiên tai do gió mạnh trên biển: Cấp 1</p>`, */
        editorConfig: {
            // The configuration of the editor.
        }
    }

    status: any = [
        {
            text: 'Public',
            value: 1
        },
        {
            text: 'Private',
            value: 2
        },
    ]

    category: any = [
        {
            text: 'Thời tiết',
            value: 1
        },
        {
            text: 'Tin tức',
            value: 2
        },
    ]

    rules = {
        dateRules: [v => !!v || 'Vui lòng nhập đúng định dạng ngày tháng'],
        statusRules: [v => !!v || 'Vui lòng chọn trạng thái'],
        categoryRules: [v => !!v || 'Vui lòng chọn danh mục']
    }

    postModel: IPost = {
        eventId: null,
        title: null,
        content: null,
        imageUrl: null,
        datePosted: null,
        status: null,
        categoryId: null
    }

    createPost() {
        //@ts-ignore
        this.valid = this.$refs.postForm.validate();
        const vm = this as any;
        if(this.valid) {
            this.postService.createPost(this.postModel).then(res => {
                vm.$router.push(PATH.LIST_POST);
            }).catch(err => {
                console.log(err);
            })
        }
    }
}
