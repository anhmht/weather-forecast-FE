import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";


@Component({
    template: require("./template.html").default,
    components: {}
})
export default class WindySettingComponent extends Vue {
    @Prop({ type: Object, default: {} })
    setting;

    panel: number = null;
    dtSetting: {
        multiplier: number,
        velocity: number,
        width: number,
        blending: number,
        opacity: number
    } = null;

    get mini () {
        return this.panel !== 0;
    }

    get multiplier () {
        return 0 - this.dtSetting.multiplier;
    }
    
    set multiplier (val) {
        this.dtSetting.multiplier = 0 - val;
    }


    get velocity () {
        return this.dtSetting.velocity;
    }
    
    set velocity (val) {
        this.dtSetting.velocity = val;
    }


    get width () {
        return this.dtSetting.width;
    }
    
    set width (val) {
        this.dtSetting.width = val;
    }


    get blending () {
        return this.dtSetting.blending;
    }
    
    set blending (val) {
        this.dtSetting.blending = val;
    }


    get opacity () {
        return this.dtSetting.opacity;
    }
    
    set opacity (val) {
        this.dtSetting.opacity = val;
    }

    handleChange(value) {
        this.$emit("change-windy-setting", this.dtSetting);
    }

    mounted () {
        this.dtSetting = this.setting ? {...this.setting} : null;
    }
}
