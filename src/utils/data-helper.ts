export class DataHelper {
    static deepClone<T>(source: any): T {
        if (source === undefined) return undefined;
        const json = JSON.stringify(source);
        return JSON.parse(json);
    }

    static getMinMaxTemp(temp, forecastDateApplyWithCurrent = 0) {
        const hours = Object.keys(temp).filter(x => x.includes('_'));
        const tempValue = []
        const limitDate = (forecastDateApplyWithCurrent * 24) + 24;
        for (let index = forecastDateApplyWithCurrent * 24; index < limitDate; index++) {
            tempValue.push(temp[hours[index]]);
        }
        return {
            min: Math.min(...tempValue),
            max: Math.max(...tempValue),
        }
    }

    static getTempByHour(temp, offset) {
        const hours = Object.keys(temp).filter(x => x.includes('_'));
        let refDate = Object.keys(temp).filter(x => x.includes('refDate'));
        let refHour = new Date(temp[refDate[0]]).getHours();
        let currentHour = new Date().getHours();
        return temp[hours[currentHour - refHour + offset - 1]];
    }

    static getDisplayHour(offset) {
        let displayHour = new Date().getHours() + offset;
        if (displayHour > 23) {
            return displayHour - 24 + ':00';
        }
        return displayHour + ':00';
    }
}
