import { BASE_CLOUD_URL } from './../constant/common-constant';
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
        let refDay = new Date(temp[refDate[0]]).getDate();
        let currentHour = new Date().getHours();
        let currentDay = new Date().getDate();
        if (currentDay > refDay) {
            currentHour = currentHour + 24 * (currentDay - refDay);
        }
        return temp[hours[currentHour - refHour + offset - 1]];
    }

    static getDisplayHour(offset) {
        let displayHour = new Date().getHours() + offset;
        if (displayHour > 23) {
            return displayHour - 24 + ':00';
        }
        return displayHour + ':00';
    }

    static getImageArray(htmlStr) {
        const node = document.createElement('div');
        node.innerHTML = htmlStr;
        const nodeList = node.querySelectorAll('img');
        const result = [];
        nodeList.forEach(el => {
            result.push(el.src);
        });
        return result.filter(x => x.includes(BASE_CLOUD_URL));
    }

    static generateInsertAndDeleteArr(entity:string , original: string) {
        const originalArr = this.getImageArray(original);
        const entityArr = this.getImageArray(entity);
        const imageNormalDelete = [];
        const imageNormalAdd = [];
        originalArr.forEach(element => {
            const img = entityArr.find(x => x === element);
            if(!img) {
                imageNormalDelete.push(element)
            }
        });
        entityArr.forEach(element => {
            const img = originalArr.find(x => x === element);
            if (!img) {
                imageNormalAdd.push(element)
            }
        });
        return { imageNormalDelete, imageNormalAdd };
    }

}
