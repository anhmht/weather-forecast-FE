import { Component, Prop, Vue } from 'vue-property-decorator';


@Component({
    template: require("./template.html").default,
    components: {}
})
export default class ScenarioComponent extends Vue {
    @Prop({required: true})
    value

    selectedItem = 0
    items = [
        { text: 'Real-Time', icon: 'mdi-clock' },
        { text: 'Audience', icon: 'mdi-account' },
        { text: 'Conversions', icon: 'mdi-flag' },
    ]

    get drawer() {
        return this.value;
    }

    set drawer(value) {
        console.log(value);

        this.$emit('input', value)
    }
}
