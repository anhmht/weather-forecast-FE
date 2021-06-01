

import CKEditor from '@ckeditor/ckeditor5-vue2';
import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';

// Plugin
import EssentialsPlugin from '@ckeditor/ckeditor5-essentials/src/essentials';
import HeadingPlugin from '@ckeditor/ckeditor5-heading/src/heading';
import ListPlugin from '@ckeditor/ckeditor5-list/src/list';
import AlignmentPlugin from '@ckeditor/ckeditor5-alignment/src/alignment';
import Image from '@ckeditor/ckeditor5-image/src/image';
import ImageToolbar from '@ckeditor/ckeditor5-image/src/imagetoolbar';
import ImageCaption from '@ckeditor/ckeditor5-image/src/imagecaption';
import ImageStyle from '@ckeditor/ckeditor5-image/src/imagestyle';
import ImageResize from '@ckeditor/ckeditor5-image/src/imageresize';
import LinkImage from '@ckeditor/ckeditor5-link/src/linkimage';
import ImageInsert from '@ckeditor/ckeditor5-image/src/imageinsert';
import BoldPlugin from '@ckeditor/ckeditor5-basic-styles/src/bold';
import ItalicPlugin from '@ckeditor/ckeditor5-basic-styles/src/italic';
import LinkPlugin from '@ckeditor/ckeditor5-link/src/link';
import HighlightPlugin from '@ckeditor/ckeditor5-highlight/src/highlight';
import IndentPlugin from '@ckeditor/ckeditor5-indent/src/indent';
import FontPlugin from '@ckeditor/ckeditor5-font/src/font';
import MeidaEmbedPlugin from '@ckeditor/ckeditor5-media-embed/src/mediaembed';
import ParagraphPlugin from '@ckeditor/ckeditor5-paragraph/src/paragraph';
import BlockQuote from '@ckeditor/ckeditor5-block-quote/src/blockquote';

//Custom Plugin
import { MyCustomUploadAdapterPlugin } from './custom-upload-adaptor/upload-adapter';

import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';

@Component({
    template: require("./template.html").default,
    components: {
        ckeditor: CKEditor.component
    }
})
export default class CKEditorComponent extends Vue {
    @Prop()
    value

    CKEditorOptions: any = {
        editor: ClassicEditor,

        editorConfig: {
            height: 500,
            plugins: [
                EssentialsPlugin, BoldPlugin, HeadingPlugin, ListPlugin, ItalicPlugin,
                LinkPlugin, ParagraphPlugin, BlockQuote, HighlightPlugin, IndentPlugin,
                FontPlugin, MeidaEmbedPlugin, AlignmentPlugin, Image, ImageToolbar,
                ImageCaption, ImageStyle, ImageResize, LinkImage, ImageInsert
            ],
            toolbar: {
                items: [
                    'heading', 'fontFamily', '|', 'bold', 'italic', 'highlight', 'alignment', '|',
                    'link', 'bulletedList', 'numberedList', 'insertImage',
                    'mediaEmbed', 'blockQuote', 'undo', 'redo'
                ]
            },
            image: {
                toolbar: [
                    'imageStyle:full', 'imageStyle:side', '|', 'imageTextAlternative', '|', 'linkImage'
                ]
            },
            extraPlugins: [MyCustomUploadAdapterPlugin],
        }
    }

    get editorData() {
        return this.value;
    }
    set editorData(value) {
        this.$emit('input', value);
    }
}
