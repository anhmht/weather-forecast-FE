(self.webpackChunktemp=self.webpackChunktemp||[]).push([[6398],{36398:(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";eval('\n// EXPORTS\n__webpack_require__.d(__webpack_exports__, {\n  "x": () => (/* binding */ WeatherServices)\n});\n\n// EXTERNAL MODULE: ./src/service/generic-service/generic.service.ts\nvar generic_service = __webpack_require__(48449);\n;// CONCATENATED MODULE: ./src/constant/uri/weather-constants.ts\n/* harmony default export */ const weather_constants = ({\r\n    getDetail: \'/api/WeatherInformation/get-detail\',\r\n    getHorizontal: \'/api/WeatherInformation/get-horizontal\',\r\n});\r\n\n;// CONCATENATED MODULE: ./src/service/weather-service/weather.service.ts\nvar __extends = (undefined && undefined.__extends) || (function () {\r\n    var extendStatics = function (d, b) {\r\n        extendStatics = Object.setPrototypeOf ||\r\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\r\n            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };\r\n        return extendStatics(d, b);\r\n    };\r\n    return function (d, b) {\r\n        if (typeof b !== "function" && b !== null)\r\n            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");\r\n        extendStatics(d, b);\r\n        function __() { this.constructor = d; }\r\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\r\n    };\r\n})();\r\n\r\n\r\nvar WeatherServices = /** @class */ (function (_super) {\r\n    __extends(WeatherServices, _super);\r\n    function WeatherServices() {\r\n        return _super !== null && _super.apply(this, arguments) || this;\r\n    }\r\n    WeatherServices.prototype.getDetail = function (payload) {\r\n        return this.executeSelectingPost(payload, weather_constants.getDetail).then(function (response) {\r\n            return Promise.resolve(response);\r\n        }).catch(function (error) { return Promise.reject(error); });\r\n    };\r\n    WeatherServices.prototype.getHorizontal = function (payload) {\r\n        return this.executeSelectingPost(payload, weather_constants.getHorizontal).then(function (response) {\r\n            return Promise.resolve(response);\r\n        }).catch(function (error) { return Promise.reject(error); });\r\n    };\r\n    return WeatherServices;\r\n}(generic_service/* GenericServices */.d));\r\n\r\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90ZW1wLy4vc3JjL2NvbnN0YW50L3VyaS93ZWF0aGVyLWNvbnN0YW50cy50cz9hMGY1Iiwid2VicGFjazovL3RlbXAvLi9zcmMvc2VydmljZS93ZWF0aGVyLXNlcnZpY2Uvd2VhdGhlci5zZXJ2aWNlLnRzPzI3NjEiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsd0RBQWU7SUFDWCxTQUFTLEVBQUUsb0NBQW9DO0lBQy9DLGFBQWEsRUFBRSx3Q0FBd0M7Q0FDMUQ7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0ZvRTtBQUNsQjtBQUduRDtJQUFxQyxtQ0FBZTtJQUFwRDs7SUFXQSxDQUFDO0lBVkcsbUNBQVMsR0FBVCxVQUFVLE9BQTZCO1FBQ25DLE9BQU8sSUFBSSxDQUFDLG9CQUFvQixDQUFDLE9BQU8sRUFBRSwyQkFBYSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUMsUUFBcUI7WUFDaEYsT0FBTyxPQUFPLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQztRQUNwQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsZUFBSyxJQUFJLGNBQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEVBQXJCLENBQXFCLENBQUM7SUFDNUMsQ0FBQztJQUNELHVDQUFhLEdBQWIsVUFBYyxPQUE2QjtRQUN2QyxPQUFPLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxPQUFPLEVBQUUsK0JBQWlCLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQyxRQUFxQjtZQUNwRixPQUFPLE9BQU8sQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDO1FBQ3BDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxlQUFLLElBQUksY0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsRUFBckIsQ0FBcUIsQ0FBQztJQUM1QyxDQUFDO0lBQ0wsc0JBQUM7QUFBRCxDQUFDLENBWG9DLHNDQUFlLEdBV25EIiwiZmlsZSI6IjM2Mzk4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQge1xyXG4gICAgZ2V0RGV0YWlsOiAnL2FwaS9XZWF0aGVySW5mb3JtYXRpb24vZ2V0LWRldGFpbCcsXHJcbiAgICBnZXRIb3Jpem9udGFsOiAnL2FwaS9XZWF0aGVySW5mb3JtYXRpb24vZ2V0LWhvcml6b250YWwnLFxyXG59XHJcbiIsImltcG9ydCB7IEFwaVJlc3BvbnNlIH0gZnJvbSBcIkAvbW9kZWwvYXBwLWNvbmZpZ1wiO1xyXG5pbXBvcnQgeyBHZW5lcmljU2VydmljZXMgfSBmcm9tIFwiLi4vZ2VuZXJpYy1zZXJ2aWNlL2dlbmVyaWMuc2VydmljZVwiO1xyXG5pbXBvcnQgVXJpIGZyb20gXCJAL2NvbnN0YW50L3VyaS93ZWF0aGVyLWNvbnN0YW50c1wiO1xyXG5pbXBvcnQgeyBJRm9yZWNhc3RTZWFyY2hQYXJhbSB9IGZyb20gXCJAL21vZGVsL2ZvcmVjYXN0XCI7XHJcblxyXG5leHBvcnQgY2xhc3MgV2VhdGhlclNlcnZpY2VzIGV4dGVuZHMgR2VuZXJpY1NlcnZpY2VzIHtcclxuICAgIGdldERldGFpbChwYXlsb2FkOiBJRm9yZWNhc3RTZWFyY2hQYXJhbSk6IFByb21pc2U8QXBpUmVzcG9uc2U+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5leGVjdXRlU2VsZWN0aW5nUG9zdChwYXlsb2FkLCBVcmkuZ2V0RGV0YWlsKS50aGVuKChyZXNwb25zZTogQXBpUmVzcG9uc2UpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShyZXNwb25zZSlcclxuICAgICAgICB9KS5jYXRjaChlcnJvciA9PiBQcm9taXNlLnJlamVjdChlcnJvcikpXHJcbiAgICB9XHJcbiAgICBnZXRIb3Jpem9udGFsKHBheWxvYWQ6IElGb3JlY2FzdFNlYXJjaFBhcmFtKTogUHJvbWlzZTxBcGlSZXNwb25zZT4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmV4ZWN1dGVTZWxlY3RpbmdQb3N0KHBheWxvYWQsIFVyaS5nZXRIb3Jpem9udGFsKS50aGVuKChyZXNwb25zZTogQXBpUmVzcG9uc2UpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShyZXNwb25zZSlcclxuICAgICAgICB9KS5jYXRjaChlcnJvciA9PiBQcm9taXNlLnJlamVjdChlcnJvcikpXHJcbiAgICB9XHJcbn1cclxuIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///36398\n')}}]);