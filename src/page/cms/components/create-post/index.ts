import Vue from "vue";
import Component from "vue-class-component";
import CKEditor from '@ckeditor/ckeditor5-vue2';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
    template: require("./template.html").default,
    components: {
        ckeditor: CKEditor.component
    }
})
export default class CreatePostComponent extends Vue {
    CKEditorOptions: any = {
        editor: ClassicEditor,
        editorData: `<p>TIN CẢNH BÁO MƯA DÔNG TRÊN CÁC VÙNG BIỂN PHÍA NAM</p>
                    <p>Hiện nay (23/5): Rãnh áp thấp có trục ở khoảng 10-12 độ Vĩ Bắc. 
                    Gió mùa Tây Nam đang hoạt động mạnh dần lên.</p>
                    <p>Dự báo: Do ảnh hưởng của rãnh áp thấp phân tích trên kết hợp với hoạt động của gió mùa Tây Nam 
                    nên ngày và đêm nay (23/5), ở vùng biển từ Bình Thuận đến Cà Mau có gió Tây Nam mạnh cấp 5, 
                    có lúc cấp 6, giật cấp 7-8, biển động; sóng biển cao từ 1,5-3,0m.</p>
                    <p>Khu vực giữa và Nam Biển Đông (bao gồm cả vùng biển quần đảo Trường Sa), 
                    vùng biển từ Bình Định đến Cà Mau, từ Cà Mau đến Kiên Giang và vịnh Thái Lan 
                    có mưa rào và dông. Trong mưa dông có khả năng xảy ra lốc xoáy và gió giật mạnh. </p>
                    <p>Cảnh báo cấp độ rủi ro thiên tai do gió mạnh trên biển: Cấp 1</p>`,
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
}
