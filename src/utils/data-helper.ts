
import { BASE_CLOUD_URL } from './../constant/common-constant';
import moment from 'moment';
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

    static getDataByHour(temp, offset) {
        const hours = Object.keys(temp).filter(x => x.includes('_'));
        let refDate = Object.keys(temp).filter(x => x.includes('refDate'));
        const diffHours = moment().add(offset, 'hours').diff(moment(temp[refDate[0]]), 'hours');
        const result = diffHours - 1;
        return temp[hours[result]];
    }

    static getMostFrequentIcon(temp, date) {
        let currentHour = new Date().getHours();
        let arr = new Array();

        // Get most frequent icon at daylight from 6:00 to 18:00 for next 5 day
        if (currentHour >= 6 && currentHour <= 18) {
            if (date != 0) {
                currentHour = 6;
            }

            for (let i = currentHour; i <= 18; i++) {
                arr.push(DataHelper.getDataByDateHour(temp, date, i));
            }
        }
        // Get most frequent icon at night from 19:00 to 5:00 next day for next 5 day
        else {
            if (date == 0) {
                if (currentHour >= 0 && currentHour <= 5) {
                    currentHour = currentHour + 24;
                }
            } else {
                currentHour = 19;
            }

            for (let i = currentHour; i <= 5 + 24; i++) {
                if (i <= 23) {
                    arr.push(DataHelper.getDataByDateHour(temp, date, i));
                } else {
                    arr.push(DataHelper.getDataByDateHour(temp, date, i - 24));
                }
                
            }
        }

        const hashmap = arr.reduce((acc, val) => {
            acc[val] = (acc[val] || 0 ) + 1
            return acc
        },{})
        return Object.keys(hashmap).reduce((a, b) => hashmap[a] > hashmap[b] ? a : b);
    }

    static getDataByDateHour(temp, date, time) {
        const hours = Object.keys(temp).filter(x => x.includes('_'));
        let refDate = Object.keys(temp).filter(x => x.includes('refDate'));
        const diffHours = moment().add(date, 'days').hours(time).diff(moment(temp[refDate[0]]), 'hours');
        const result = diffHours -1;
        return temp[hours[result]];
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
