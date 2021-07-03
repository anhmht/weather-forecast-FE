import { ScenarioServices } from './../../../../../../service/scenario-service/scenario.service';
import { Scenario } from './../../../../../../model/scenario/scenario.model';
import { IScenario } from '@/model/scenario';
import { DataHelper } from '@/utils/data-helper';
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';

@Component({
    template: require("./template.html").default,
    components: {}
})
export default class AddUpdateScenarioComponent extends Vue {
    @Prop({required: true})
    value

    @Prop({type: Object, default: null})
    content

    valid: boolean = true;
    data: IScenario = null;
    buttonLoading: boolean = false;

    scenarioService = new ScenarioServices();

    get visibleAddItem() {
        return this.value;
    }

    set visibleAddItem(value) {
        this.$emit('input', value)
    }

    rules = {
        scenarioNameRules: [v => !!v || 'Vui lòng nhập tiêu đề kịch bản']
    }

    handleSave() {
        //@ts-ignore
        this.valid = this.$refs.scenarioForm.validate();

        if(this.valid) {
            this.buttonLoading = true;
            let requestHolder: Promise<any>;
            let successMessage: string = null;
            let errorMessage: string = null;
            if(this.content) {
                requestHolder = this.scenarioService.updateScenario(this.data);
                successMessage = 'Chỉnh sửa kịch bản thành công';
                errorMessage = 'Có lỗi khi chỉnh sửa kịch bản';
            } else {
                requestHolder = this.scenarioService.createScenario(this.data);
                successMessage = 'Tạo kịch bản thành công';
                errorMessage = 'Có lỗi khi tạo kịch bản';
            }
            requestHolder.then((res:any) => {
                this.$toast.success(successMessage);
                this.buttonLoading = false;
                this.data.scenarioId = res;
                this.$emit('save', this.data);
                this.visibleAddItem = false
            }).catch(err => {
                this.$toast.error(errorMessage);
                console.log(err);
                this.buttonLoading = false;
            });
        }
        
    }

    @Watch('value')
    dialogVisible(visible) {
        if (visible) {
            this.data = this.content ? DataHelper.deepClone(this.content) : new Scenario({});
        }
    }
}
