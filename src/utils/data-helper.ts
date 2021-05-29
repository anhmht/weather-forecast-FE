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
        for (let index = forecastDateApplyWithCurrent; index < limitDate; index++) {
            tempValue.push(temp[hours[index]]);
        }
        return {
            min: Math.min(...tempValue),
            max: Math.max(...tempValue),
        }
    }

    static getCurrentDayTempByHour(temp, currentHour) {
        const hours = Object.keys(temp).filter(x => x.includes('_'));
        const currentHourModified = '_' + currentHour;
        for (let index = 0; index < 24; index++) {
            if (hours[index] === currentHourModified) {
                return temp[hours[index]];
            }
        }
    }
}
