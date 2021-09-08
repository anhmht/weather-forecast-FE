
import { Comment, IComment } from '@/model/social';
import { SocialServices } from '@/service/social-service/social.service';
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';

@Component({
    template: require("./template.html").default,
    components: {}
})
export default class AnonymousFormComponent extends Vue {
    @Prop({required: true})
    value

    @Prop({type: Object, default: null})
    content

    valid: boolean = true;
    data: IComment = null;
    buttonLoading: boolean = false;

    service: SocialServices = new SocialServices();

    get visibleAddComment() {
        return this.value;
    }

    set visibleAddComment(value) {
        this.$emit('input', value)
    }

    rules = {
        fullName: [v => !!v || 'Vui lòng nhập họ và tên'],
        email: [
            v => !!v || 'Vui lòng nhập email',
            v => /.+@.+/.test(v) || 'Địa chỉ email không hợp lệ'
        ],
        phone: [
            v => !!v || 'Vui lòng nhập số điện thoại',
            v => /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g.test(v) || 'Số điện thoại không hợp lệ'
        ],
    }

    handleSave() {
        //@ts-ignore
        this.valid = this.$refs.AnonymousForm.validate();

        if(this.valid) {
            this.service.createComment(this.data)
                .then(res => {
                    this.$toast.success('Đăng bình luận thành công.Bình luận đang được xét duyệt.');
                    this.$emit('reset');
                }).catch(err => {
                    this.$toast.error('Có lỗi khi bình luận');
                    console.log(err);
                })
        }
        
    }

    @Watch('value')
    dialogVisible(visible) {
        if (visible) {
            this.data = new Comment(this.content);
        }
    }
}
