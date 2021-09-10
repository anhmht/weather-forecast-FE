
import { BASE_CLOUD_URL } from './../constant/common-constant';
import { WEATHER_TYPE } from '@/constant/forcast-station-constant';
import moment from 'moment';

export class DataHelper {
    static deepClone<T>(source: any): T {
        if (source === undefined) return undefined;
        const json = JSON.stringify(source);
        return JSON.parse(json);
    }

    static insertAndShift(arr, from, to) {
        let cutOut = arr.splice(from, 1)[0]; // cut the element at index 'from'
        arr.splice(to, 0, cutOut);            // insert it at index 'to'
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
        let hours = Object.keys(temp).filter(x => x.includes('_'));
        hours = hours.sort((a,b) => {
            return parseInt(a.substr(1), 10) - parseInt(b.substr(1), 10);
        });
        let refDate = Object.keys(temp).filter(x => x.includes('refDate'));
        const diffHours = moment().add(offset, 'hours').diff(moment(temp[refDate[0]]), 'hours');
        const result = diffHours;
        return temp[hours[result]];
    }

    static getMostFrequentIcon(temp, date) {
        const originalHour = new Date().getHours();
        let currentHour = originalHour;
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
                    if (originalHour > 5) {
                        arr.push(DataHelper.getDataByDateHour(temp, date, i));
                    } else {
                        arr.push(DataHelper.getDataByDateHour(temp, date - 1, i));
                    }
                } else {
                    if (originalHour > 5) {
                        arr.push(DataHelper.getDataByDateHour(temp, date + 1, i - 24));
                    } else {
                        arr.push(DataHelper.getDataByDateHour(temp, date, i - 24));
                    }
                }

            }
        }

        const hashmap = arr.reduce((acc, val) => {
            acc[val] = (acc[val] || 0 ) + 1
            return acc
        },{})
        return Object.keys(hashmap).reduce((a, b) => hashmap[a] > hashmap[b] ? a : b);
    }

    static getMostFrequent(temp, weatherType) {
        const currentHour = new Date().getHours();
        let arr = new Array();

        if (weatherType === WEATHER_TYPE.WindDirection) {
            temp.forEach(element => {
                arr.push(element.value);
            });
        } else if (weatherType === WEATHER_TYPE.Weather) {
            if (currentHour >= 6 && currentHour <= 18) {
                for (let i = 6; i <= 18; i++) {
                    if (!temp[i]) {
                        break;
                    }
                    arr.push(temp[i].value);
                }
            } else {
                for (let i = 0; i < 24; i++) {
                    if (i < 6 || i > 18) {
                        if (!temp[i]) {
                            break;
                        }
                        arr.push(temp[i].value);
                    }
                }
            }
        }


        const hashmap = arr.reduce((acc, val) => {
            acc[val] = (acc[val] || 0 ) + 1
            return acc
        },{})
        return Object.keys(hashmap).reduce((a, b) => hashmap[a] > hashmap[b] ? a : b);
    }

    static getMostFrequentByHorizontal(temp) {
        let arr: any = [];
        temp.forEach(element => {
            arr.push(element);
        });

        const hashmap = arr.reduce((acc, val) => {
            acc[val] = (acc[val] || 0 ) + 1
            return acc
        },{})
        return Object.keys(hashmap).reduce((a, b) => hashmap[a] > hashmap[b] ? a : b);
    }

    static getDataByDateHour(temp, date, time) {
        let hours = Object.keys(temp).filter(x => x.includes('_'));
        hours = hours.sort((a, b) => {
            return parseInt(a.substr(1), 10) - parseInt(b.substr(1), 10);
        });
        let refDate = Object.keys(temp).filter(x => x.includes('refDate'));
        const diffHours = moment().add(date, 'days').hours(time).diff(moment(temp[refDate[0]]), 'hours');
        const result = diffHours > 0 ? diffHours : 1;
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

    static create_UUID() {
        let dt = new Date().getTime();
        let uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            let r = (dt + Math.random() * 16) % 16 | 0;
            dt = Math.floor(dt / 16);
            return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
        return uuid;
    }

    static convertToNonAccent(str: string) {
        let text = '';
        if (str != null && str !== '') {
            str = str.replace(/[\u0300-\u036f]/g, "").toLowerCase();
            str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
            str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
            str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
            str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
            str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
            str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
            str = str.replace(/đ/g, "d");
            // Some system encode vietnamese combining accent as individual utf-8 characters
            str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // Huyền sắc hỏi ngã nặng 
            str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // Â, Ê, Ă, Ơ, Ư
            text = str.replace(/\s/g, '');
        }
        return text;
    }

    static generateColorByString(str: string) {
        str = str || "";
        let hash = 0;
        const s =str.length > 0 ? 90 : 1; // saturation
        const l = str.length > 0 ? 25: 90; // lightness
        for (let i = 0; i < str.length; i++) {
            hash = str.charCodeAt(i) + ((hash << 5) - hash);
        }

        let h = hash % 360;
        return 'hsl('+h+', '+s+'%, '+l+'%)';
    }

    static insertCharacterAtCursorPositionOfTextArea (refTextarea, value) {
        let tArea = refTextarea.$refs ? refTextarea.$refs.input : refTextarea;
        let startPos = tArea.selectionStart;
        let endPos = tArea.selectionEnd;
        let cursorPos = startPos;
        let tmpStr = tArea.value;
    
        // insert new character:
        const result = tmpStr.substring(0, startPos) + value + tmpStr.substring(endPos, tmpStr.length);
        
        // set cursor after new character:
        setTimeout(() => {
            cursorPos += value.length;
            tArea.selectionStart = tArea.selectionEnd = cursorPos;
        }, 10);
        return result;
    }
    
    static convertDecimalCodeToEmoji (text) {
        let result = text;
        let matchList = text.match(/(\&\#([0-9]*)\;)/gm);
        if (matchList && matchList.length > 0) {
            matchList = matchList.filter((v,i, self) => {
                return self.indexOf(v) === i;
            });
            
            matchList.forEach(el => {
                result = result.replaceAll(el, String.fromCodePoint(el.slice(2,-1)))
            });
        }
        return result;
    }
    
    static convertEmojiToDecimal (text) {
        let result = text;
        let reg = new RegExp(/(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])/g);
        let emojiList = text.match(reg);
        if (emojiList && emojiList.length > 0) {
            emojiList = emojiList.forEach(e => {
                result = result.replaceAll(e, `&#${e.codePointAt(0).toString()};`)
            });
        }        
        return result;
    }
}
