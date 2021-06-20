(self.webpackChunktemp=self.webpackChunktemp||[]).push([[1166],{1166:(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";eval("/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"i\": () => (/* binding */ DataHelper)\n/* harmony export */ });\n/* harmony import */ var _constant_common_constant__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7081);\n/* harmony import */ var _constant_forcast_station_constant__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2102);\n/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(381);\n/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_2__);\n\r\n\r\n\r\nvar DataHelper = /** @class */ (function () {\r\n    function DataHelper() {\r\n    }\r\n    DataHelper.deepClone = function (source) {\r\n        if (source === undefined)\r\n            return undefined;\r\n        var json = JSON.stringify(source);\r\n        return JSON.parse(json);\r\n    };\r\n    DataHelper.insertAndShift = function (arr, from, to) {\r\n        var cutOut = arr.splice(from, 1)[0]; // cut the element at index 'from'\r\n        arr.splice(to, 0, cutOut); // insert it at index 'to'\r\n    };\r\n    DataHelper.getMinMaxTemp = function (temp, forecastDateApplyWithCurrent) {\r\n        if (forecastDateApplyWithCurrent === void 0) { forecastDateApplyWithCurrent = 0; }\r\n        var hours = Object.keys(temp).filter(function (x) { return x.includes('_'); });\r\n        var tempValue = [];\r\n        var limitDate = (forecastDateApplyWithCurrent * 24) + 24;\r\n        for (var index = forecastDateApplyWithCurrent * 24; index < limitDate; index++) {\r\n            tempValue.push(temp[hours[index]]);\r\n        }\r\n        return {\r\n            min: Math.min.apply(Math, tempValue),\r\n            max: Math.max.apply(Math, tempValue),\r\n        };\r\n    };\r\n    DataHelper.getDataByHour = function (temp, offset) {\r\n        var hours = Object.keys(temp).filter(function (x) { return x.includes('_'); });\r\n        var refDate = Object.keys(temp).filter(function (x) { return x.includes('refDate'); });\r\n        var diffHours = moment__WEBPACK_IMPORTED_MODULE_2___default()().add(offset, 'hours').diff(moment__WEBPACK_IMPORTED_MODULE_2___default()(temp[refDate[0]]), 'hours');\r\n        var result = diffHours;\r\n        return temp[hours[result]];\r\n    };\r\n    DataHelper.getMostFrequentIcon = function (temp, date) {\r\n        var originalHour = new Date().getHours();\r\n        var currentHour = originalHour;\r\n        var arr = new Array();\r\n        // Get most frequent icon at daylight from 6:00 to 18:00 for next 5 day\r\n        if (currentHour >= 6 && currentHour <= 18) {\r\n            if (date != 0) {\r\n                currentHour = 6;\r\n            }\r\n            for (var i = currentHour; i <= 18; i++) {\r\n                arr.push(DataHelper.getDataByDateHour(temp, date, i));\r\n            }\r\n        }\r\n        // Get most frequent icon at night from 19:00 to 5:00 next day for next 5 day\r\n        else {\r\n            if (date == 0) {\r\n                if (currentHour >= 0 && currentHour <= 5) {\r\n                    currentHour = currentHour + 24;\r\n                }\r\n            }\r\n            else {\r\n                currentHour = 19;\r\n            }\r\n            for (var i = currentHour; i <= 5 + 24; i++) {\r\n                if (i <= 23) {\r\n                    if (originalHour > 5) {\r\n                        arr.push(DataHelper.getDataByDateHour(temp, date, i));\r\n                    }\r\n                    else {\r\n                        arr.push(DataHelper.getDataByDateHour(temp, date - 1, i));\r\n                    }\r\n                }\r\n                else {\r\n                    if (originalHour > 5) {\r\n                        arr.push(DataHelper.getDataByDateHour(temp, date + 1, i - 24));\r\n                    }\r\n                    else {\r\n                        arr.push(DataHelper.getDataByDateHour(temp, date, i - 24));\r\n                    }\r\n                }\r\n            }\r\n        }\r\n        var hashmap = arr.reduce(function (acc, val) {\r\n            acc[val] = (acc[val] || 0) + 1;\r\n            return acc;\r\n        }, {});\r\n        return Object.keys(hashmap).reduce(function (a, b) { return hashmap[a] > hashmap[b] ? a : b; });\r\n    };\r\n    DataHelper.getMostFrequent = function (temp, weatherType) {\r\n        var currentHour = new Date().getHours();\r\n        var arr = new Array();\r\n        if (weatherType === _constant_forcast_station_constant__WEBPACK_IMPORTED_MODULE_1__/* .WEATHER_TYPE.WindDirection */ .Xg.WindDirection) {\r\n            temp.forEach(function (element) {\r\n                arr.push(element.value);\r\n            });\r\n        }\r\n        else if (weatherType === _constant_forcast_station_constant__WEBPACK_IMPORTED_MODULE_1__/* .WEATHER_TYPE.Weather */ .Xg.Weather) {\r\n            if (currentHour >= 6 && currentHour <= 18) {\r\n                for (var i = 6; i <= 18; i++) {\r\n                    if (!temp[i]) {\r\n                        break;\r\n                    }\r\n                    arr.push(temp[i].value);\r\n                }\r\n            }\r\n            else {\r\n                for (var i = 0; i < 24; i++) {\r\n                    if (i < 6 || i > 18) {\r\n                        if (!temp[i]) {\r\n                            break;\r\n                        }\r\n                        arr.push(temp[i].value);\r\n                    }\r\n                }\r\n            }\r\n        }\r\n        var hashmap = arr.reduce(function (acc, val) {\r\n            acc[val] = (acc[val] || 0) + 1;\r\n            return acc;\r\n        }, {});\r\n        return Object.keys(hashmap).reduce(function (a, b) { return hashmap[a] > hashmap[b] ? a : b; });\r\n    };\r\n    DataHelper.getDataByDateHour = function (temp, date, time) {\r\n        var hours = Object.keys(temp).filter(function (x) { return x.includes('_'); });\r\n        var refDate = Object.keys(temp).filter(function (x) { return x.includes('refDate'); });\r\n        var diffHours = moment__WEBPACK_IMPORTED_MODULE_2___default()().add(date, 'days').hours(time).diff(moment__WEBPACK_IMPORTED_MODULE_2___default()(temp[refDate[0]]), 'hours');\r\n        var result = diffHours;\r\n        return temp[hours[result]];\r\n    };\r\n    DataHelper.getDisplayHour = function (offset) {\r\n        var displayHour = new Date().getHours() + offset;\r\n        if (displayHour > 23) {\r\n            return displayHour - 24 + ':00';\r\n        }\r\n        return displayHour + ':00';\r\n    };\r\n    DataHelper.getImageArray = function (htmlStr) {\r\n        var node = document.createElement('div');\r\n        node.innerHTML = htmlStr;\r\n        var nodeList = node.querySelectorAll('img');\r\n        var result = [];\r\n        nodeList.forEach(function (el) {\r\n            result.push(el.src);\r\n        });\r\n        return result.filter(function (x) { return x.includes(_constant_common_constant__WEBPACK_IMPORTED_MODULE_0__/* .BASE_CLOUD_URL */ .W1); });\r\n    };\r\n    DataHelper.generateInsertAndDeleteArr = function (entity, original) {\r\n        var originalArr = this.getImageArray(original);\r\n        var entityArr = this.getImageArray(entity);\r\n        var imageNormalDelete = [];\r\n        var imageNormalAdd = [];\r\n        originalArr.forEach(function (element) {\r\n            var img = entityArr.find(function (x) { return x === element; });\r\n            if (!img) {\r\n                imageNormalDelete.push(element);\r\n            }\r\n        });\r\n        entityArr.forEach(function (element) {\r\n            var img = originalArr.find(function (x) { return x === element; });\r\n            if (!img) {\r\n                imageNormalAdd.push(element);\r\n            }\r\n        });\r\n        return { imageNormalDelete: imageNormalDelete, imageNormalAdd: imageNormalAdd };\r\n    };\r\n    return DataHelper;\r\n}());\r\n\r\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90ZW1wLy4vc3JjL3V0aWxzL2RhdGEtaGVscGVyLnRzPzEyNDQiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUMrRDtBQUNJO0FBQ3ZDO0FBQzVCO0lBQUE7SUFzS0EsQ0FBQztJQXJLVSxvQkFBUyxHQUFoQixVQUFvQixNQUFXO1FBQzNCLElBQUksTUFBTSxLQUFLLFNBQVM7WUFBRSxPQUFPLFNBQVMsQ0FBQztRQUMzQyxJQUFNLElBQUksR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3BDLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM1QixDQUFDO0lBRU0seUJBQWMsR0FBckIsVUFBc0IsR0FBRyxFQUFFLElBQUksRUFBRSxFQUFFO1FBQy9CLElBQUksTUFBTSxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsa0NBQWtDO1FBQ3ZFLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFZLDBCQUEwQjtJQUNwRSxDQUFDO0lBRU0sd0JBQWEsR0FBcEIsVUFBcUIsSUFBSSxFQUFFLDRCQUFnQztRQUFoQywrRUFBZ0M7UUFDdkQsSUFBTSxLQUFLLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsV0FBQyxJQUFJLFFBQUMsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLEVBQWYsQ0FBZSxDQUFDLENBQUM7UUFDN0QsSUFBTSxTQUFTLEdBQUcsRUFBRTtRQUNwQixJQUFNLFNBQVMsR0FBRyxDQUFDLDRCQUE0QixHQUFHLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUMzRCxLQUFLLElBQUksS0FBSyxHQUFHLDRCQUE0QixHQUFHLEVBQUUsRUFBRSxLQUFLLEdBQUcsU0FBUyxFQUFFLEtBQUssRUFB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LElBQUksQ0FBQyxHQUFHLEVBQUU7Z0JBQ04sY0FBYyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7YUFDL0I7UUFDTCxDQUFDLENBQUMsQ0FBQztRQUNILE9BQU8sRUFBRSxpQkFBaUIscUJBQUUsY0FBYyxrQkFBRSxDQUFDO0lBQ2pELENBQUM7SUFFTCxpQkFBQztBQUFELENBQUMiLCJmaWxlIjoiMTE2Ni5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgeyBCQVNFX0NMT1VEX1VSTCB9IGZyb20gJy4vLi4vY29uc3RhbnQvY29tbW9uLWNvbnN0YW50JztcclxuaW1wb3J0IHsgV0VBVEhFUl9UWVBFIH0gZnJvbSAnQC9jb25zdGFudC9mb3JjYXN0LXN0YXRpb24tY29uc3RhbnQnO1xyXG5pbXBvcnQgbW9tZW50IGZyb20gJ21vbWVudCc7XHJcbmV4cG9ydCBjbGFzcyBEYXRhSGVscGVyIHtcclxuICAgIHN0YXRpYyBkZWVwQ2xvbmU8VD4oc291cmNlOiBhbnkpOiBUIHtcclxuICAgICAgICBpZiAoc291cmNlID09PSB1bmRlZmluZWQpIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICAgICAgY29uc3QganNvbiA9IEpTT04uc3RyaW5naWZ5KHNvdXJjZSk7XHJcbiAgICAgICAgcmV0dXJuIEpTT04ucGFyc2UoanNvbik7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGluc2VydEFuZFNoaWZ0KGFyciwgZnJvbSwgdG8pIHtcclxuICAgICAgICBsZXQgY3V0T3V0ID0gYXJyLnNwbGljZShmcm9tLCAxKVswXTsgLy8gY3V0IHRoZSBlbGVtZW50IGF0IGluZGV4ICdmcm9tJ1xyXG4gICAgICAgIGFyci5zcGxpY2UodG8sIDAsIGN1dE91dCk7ICAgICAgICAgICAgLy8gaW5zZXJ0IGl0IGF0IGluZGV4ICd0bydcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgZ2V0TWluTWF4VGVtcCh0ZW1wLCBmb3JlY2FzdERhdGVBcHBseVdpdGhDdXJyZW50ID0gMCkge1xyXG4gICAgICAgIGNvbnN0IGhvdXJzID0gT2JqZWN0LmtleXModGVtcCkuZmlsdGVyKHggPT4geC5pbmNsdWRlcygnXycpKTtcclxuICAgICAgICBjb25zdCB0ZW1wVmFsdWUgPSBbXVxyXG4gICAgICAgIGNvbnN0IGxpbWl0RGF0ZSA9IChmb3JlY2FzdERhdGVBcHBseVdpdGhDdXJyZW50ICogMjQpICsgMjQ7XHJcbiAgICAgICAgZm9yIChsZXQgaW5kZXggPSBmb3JlY2FzdERhdGVBcHBseVdpdGhDdXJyZW50ICogMjQ7IGluZGV4IDwgbGltaXREYXRlOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgIHRlbXBWYWx1ZS5wdXNoKHRlbXBbaG91cnNbaW5kZXhdXSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIG1pbjogTWF0aC5taW4oLi4udGVtcFZhbHVlKSxcclxuICAgICAgICAgICAgbWF4OiBNYXRoLm1heCguLi50ZW1wVmFsdWUpLFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgZ2V0RGF0YUJ5SG91cih0ZW1wLCBvZmZzZXQpIHtcclxuICAgICAgICBjb25zdCBob3VycyA9IE9iamVjdC5rZXlzKHRlbXApLmZpbHRlcih4ID0+IHguaW5jbHVkZXMoJ18nKSk7XHJcbiAgICAgICAgbGV0IHJlZkRhdGUgPSBPYmplY3Qua2V5cyh0ZW1wKS5maWx0ZXIoeCA9PiB4LmluY2x1ZGVzKCdyZWZEYXRlJykpO1xyXG4gICAgICAgIGNvbnN0IGRpZmZIb3VycyA9IG1vbWVudCgpLmFkZChvZmZzZXQsICdob3VycycpLmRpZmYobW9tZW50KHRlbXBbcmVmRGF0ZVswXV0pLCAnaG91cnMnKTtcclxuICAgICAgICBjb25zdCByZXN1bHQgPSBkaWZmSG91cnM7XHJcbiAgICAgICAgcmV0dXJuIHRlbXBbaG91cnNbcmVzdWx0XV07XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGdldE1vc3RGcmVxdWVudEljb24odGVtcCwgZGF0ZSkge1xyXG4gICAgICAgIGNvbnN0IG9yaWdpbmFsSG91ciA9IG5ldyBEYXRlKCkuZ2V0SG91cnMoKTtcclxuICAgICAgICBsZXQgY3VycmVudEhvdXIgPSBvcmlnaW5hbEhvdXI7XHJcbiAgICAgICAgbGV0IGFyciA9IG5ldyBBcnJheSgpO1xyXG5cclxuICAgICAgICAvLyBHZXQgbW9zdCBmcmVxdWVudCBpY29uIGF0IGRheWxpZ2h0IGZyb20gNjowMCB0byAxODowMCBmb3IgbmV4dCA1IGRheVxyXG4gICAgICAgIGlmIChjdXJyZW50SG91ciA+PSA2ICYmIGN1cnJlbnRIb3VyIDw9IDE4KSB7XHJcbiAgICAgICAgICAgIGlmIChkYXRlICE9IDApIHtcclxuICAgICAgICAgICAgICAgIGN1cnJlbnRIb3VyID0gNjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IGN1cnJlbnRIb3VyOyBpIDw9IDE4OyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGFyci5wdXNoKERhdGFIZWxwZXIuZ2V0RGF0YUJ5RGF0ZUhvdXIodGVtcCwgZGF0ZSwgaSkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIEdldCBtb3N0IGZyZXF1ZW50IGljb24gYXQgbmlnaHQgZnJvbSAxOTowMCB0byA1OjAwIG5leHQgZGF5IGZvciBuZXh0IDUgZGF5XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGlmIChkYXRlID09IDApIHtcclxuICAgICAgICAgICAgICAgIGlmIChjdXJyZW50SG91ciA+PSAwICYmIGN1cnJlbnRIb3VyIDw9IDUpIHtcclxuICAgICAgICAgICAgICAgICAgICBjdXJyZW50SG91ciA9IGN1cnJlbnRIb3VyICsgMjQ7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjdXJyZW50SG91ciA9IDE5O1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gY3VycmVudEhvdXI7IGkgPD0gNSArIDI0OyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGlmIChpIDw9IDIzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9yaWdpbmFsSG91ciA+IDUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXJyLnB1c2goRGF0YUhlbHBlci5nZXREYXRhQnlEYXRlSG91cih0ZW1wLCBkYXRlLCBpKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXJyLnB1c2goRGF0YUhlbHBlci5nZXREYXRhQnlEYXRlSG91cih0ZW1wLCBkYXRlIC0gMSwgaSkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9yaWdpbmFsSG91ciA+IDUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXJyLnB1c2goRGF0YUhlbHBlci5nZXREYXRhQnlEYXRlSG91cih0ZW1wLCBkYXRlICsgMSwgaSAtIDI0KSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXJyLnB1c2goRGF0YUhlbHBlci5nZXREYXRhQnlEYXRlSG91cih0ZW1wLCBkYXRlLCBpIC0gMjQpKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBoYXNobWFwID0gYXJyLnJlZHVjZSgoYWNjLCB2YWwpID0+IHtcclxuICAgICAgICAgICAgYWNjW3ZhbF0gPSAoYWNjW3ZhbF0gfHwgMCApICsgMVxyXG4gICAgICAgICAgICByZXR1cm4gYWNjXHJcbiAgICAgICAgfSx7fSlcclxuICAgICAgICByZXR1cm4gT2JqZWN0LmtleXMoaGFzaG1hcCkucmVkdWNlKChhLCBiKSA9PiBoYXNobWFwW2FdID4gaGFzaG1hcFtiXSA/IGEgOiBiKTtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgZ2V0TW9zdEZyZXF1ZW50KHRlbXAsIHdlYXRoZXJUeXBlKSB7XHJcbiAgICAgICAgY29uc3QgY3VycmVudEhvdXIgPSBuZXcgRGF0ZSgpLmdldEhvdXJzKCk7XHJcbiAgICAgICAgbGV0IGFyciA9IG5ldyBBcnJheSgpO1xyXG5cclxuICAgICAgICBpZiAod2VhdGhlclR5cGUgPT09IFdFQVRIRVJfVFlQRS5XaW5kRGlyZWN0aW9uKSB7XHJcbiAgICAgICAgICAgIHRlbXAuZm9yRWFjaChlbGVtZW50ID0+IHtcclxuICAgICAgICAgICAgICAgIGFyci5wdXNoKGVsZW1lbnQudmFsdWUpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9IGVsc2UgaWYgKHdlYXRoZXJUeXBlID09PSBXRUFUSEVSX1RZUEUuV2VhdGhlcikge1xyXG4gICAgICAgICAgICBpZiAoY3VycmVudEhvdXIgPj0gNiAmJiBjdXJyZW50SG91ciA8PSAxOCkge1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDY7IGkgPD0gMTg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghdGVtcFtpXSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgYXJyLnB1c2godGVtcFtpXS52YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDI0OyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoaSA8IDYgfHwgaSA+IDE4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghdGVtcFtpXSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgYXJyLnB1c2godGVtcFtpXS52YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgY29uc3QgaGFzaG1hcCA9IGFyci5yZWR1Y2UoKGFjYywgdmFsKSA9PiB7XHJcbiAgICAgICAgICAgIGFjY1t2YWxdID0gKGFjY1t2YWxdIHx8IDAgKSArIDFcclxuICAgICAgICAgICAgcmV0dXJuIGFjY1xyXG4gICAgICAgIH0se30pXHJcbiAgICAgICAgcmV0dXJuIE9iamVjdC5rZXlzKGhhc2htYXApLnJlZHVjZSgoYSwgYikgPT4gaGFzaG1hcFthXSA+IGhhc2htYXBbYl0gPyBhIDogYik7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGdldERhdGFCeURhdGVIb3VyKHRlbXAsIGRhdGUsIHRpbWUpIHtcclxuICAgICAgICBjb25zdCBob3VycyA9IE9iamVjdC5rZXlzKHRlbXApLmZpbHRlcih4ID0+IHguaW5jbHVkZXMoJ18nKSk7XHJcbiAgICAgICAgbGV0IHJlZkRhdGUgPSBPYmplY3Qua2V5cyh0ZW1wKS5maWx0ZXIoeCA9PiB4LmluY2x1ZGVzKCdyZWZEYXRlJykpO1xyXG4gICAgICAgIGNvbnN0IGRpZmZIb3VycyA9IG1vbWVudCgpLmFkZChkYXRlLCAnZGF5cycpLmhvdXJzKHRpbWUpLmRpZmYobW9tZW50KHRlbXBbcmVmRGF0ZVswXV0pLCAnaG91cnMnKTtcclxuICAgICAgICBjb25zdCByZXN1bHQgPSBkaWZmSG91cnM7XHJcbiAgICAgICAgcmV0dXJuIHRlbXBbaG91cnNbcmVzdWx0XV07XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGdldERpc3BsYXlIb3VyKG9mZnNldCkge1xyXG4gICAgICAgIGxldCBkaXNwbGF5SG91ciA9IG5ldyBEYXRlKCkuZ2V0SG91cnMoKSArIG9mZnNldDtcclxuICAgICAgICBpZiAoZGlzcGxheUhvdXIgPiAyMykge1xyXG4gICAgICAgICAgICByZXR1cm4gZGlzcGxheUhvdXIgLSAyNCArICc6MDAnO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZGlzcGxheUhvdXIgKyAnOjAwJztcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgZ2V0SW1hZ2VBcnJheShodG1sU3RyKSB7XHJcbiAgICAgICAgY29uc3Qgbm9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgIG5vZGUuaW5uZXJIVE1MID0gaHRtbFN0cjtcclxuICAgICAgICBjb25zdCBub2RlTGlzdCA9IG5vZGUucXVlcnlTZWxlY3RvckFsbCgnaW1nJyk7XHJcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gW107XHJcbiAgICAgICAgbm9kZUxpc3QuZm9yRWFjaChlbCA9PiB7XHJcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKGVsLnNyYyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdC5maWx0ZXIoeCA9PiB4LmluY2x1ZGVzKEJBU0VfQ0xPVURfVVJMKSk7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGdlbmVyYXRlSW5zZXJ0QW5kRGVsZXRlQXJyKGVudGl0eTpzdHJpbmcgLCBvcmlnaW5hbDogc3RyaW5nKSB7XHJcbiAgICAgICAgY29uc3Qgb3JpZ2luYWxBcnIgPSB0aGlzLmdldEltYWdlQXJyYXkob3JpZ2luYWwpO1xyXG4gICAgICAgIGNvbnN0IGVudGl0eUFyciA9IHRoaXMuZ2V0SW1hZ2VBcnJheShlbnRpdHkpO1xyXG4gICAgICAgIGNvbnN0IGltYWdlTm9ybWFsRGVsZXRlID0gW107XHJcbiAgICAgICAgY29uc3QgaW1hZ2VOb3JtYWxBZGQgPSBbXTtcclxuICAgICAgICBvcmlnaW5hbEFyci5mb3JFYWNoKGVsZW1lbnQgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBpbWcgPSBlbnRpdHlBcnIuZmluZCh4ID0+IHggPT09IGVsZW1lbnQpO1xyXG4gICAgICAgICAgICBpZighaW1nKSB7XHJcbiAgICAgICAgICAgICAgICBpbWFnZU5vcm1hbERlbGV0ZS5wdXNoKGVsZW1lbnQpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICBlbnRpdHlBcnIuZm9yRWFjaChlbGVtZW50ID0+IHtcclxuICAgICAgICAgICAgY29uc3QgaW1nID0gb3JpZ2luYWxBcnIuZmluZCh4ID0+IHggPT09IGVsZW1lbnQpO1xyXG4gICAgICAgICAgICBpZiAoIWltZykge1xyXG4gICAgICAgICAgICAgICAgaW1hZ2VOb3JtYWxBZGQucHVzaChlbGVtZW50KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIHsgaW1hZ2VOb3JtYWxEZWxldGUsIGltYWdlTm9ybWFsQWRkIH07XHJcbiAgICB9XHJcblxyXG59XHJcbiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///1166\n")}}]);