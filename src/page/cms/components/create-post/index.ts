import Vue from "vue";
import Component from "vue-class-component";
import { CKEditor } from '@ckeditor/ckeditor5-vue2';
import { ClassicEditor } from '@ckeditor/ckeditor5-build-classic';

@Component({
    template: require("./template.html").default,
    components: {
        CKEditor
    }
})
export default class CreatePostComponent extends Vue {
    editor: any = ClassicEditor;
    editorData: any = '<p>Content of the editor.</p>';
    editorConfig: {
        // The configuration of the editor.
    }
}
