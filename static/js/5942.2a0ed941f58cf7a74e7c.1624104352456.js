(self.webpackChunktemp=self.webpackChunktemp||[]).push([[5942],{5942:(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";eval("/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"ce\": () => (/* binding */ DEFAULT_SCENARIOS),\n/* harmony export */   \"v6\": () => (/* binding */ SCENARIO_ACTION),\n/* harmony export */   \"Dq\": () => (/* binding */ SCENARIO_LOCATION_METHOD),\n/* harmony export */   \"j7\": () => (/* binding */ SCENARIO_DURATION),\n/* harmony export */   \"ji\": () => (/* binding */ ELEVATION)\n/* harmony export */ });\n/* unused harmony export SCENARIO_ZOOM */\nvar _a, _b;\r\nvar DEFAULT_SCENARIOS = [\r\n    {\r\n        action: 'customLocationControl',\r\n        method: 'handleClickRegion',\r\n        data: 'TBB',\r\n        duration: 3000\r\n    },\r\n    {\r\n        action: 'customLocationControl',\r\n        method: 'handleClickRegion',\r\n        data: 'DBB',\r\n        duration: 5000\r\n    },\r\n    {\r\n        action: 'customLocationControl',\r\n        method: 'handleClickRegion',\r\n        data: 'NTB',\r\n        duration: 5000\r\n    },\r\n    {\r\n        action: 'customLocationControl',\r\n        method: 'handleClickRegion',\r\n        data: 'DNB',\r\n        duration: 5000\r\n    },\r\n    {\r\n        action: 'customLocationControl',\r\n        method: 'handleClickRegion',\r\n        data: 'TNB',\r\n        duration: 5000\r\n    },\r\n];\r\nvar SCENARIO_ACTION = [\r\n    {\r\n        text: 'Di chuyển bản đồ',\r\n        value: 'customLocationControl',\r\n        color: 'blue'\r\n    },\r\n    {\r\n        text: 'Đổi trạng thái thời tiết',\r\n        value: 'customMapStatusControl',\r\n        color: 'pink'\r\n    },\r\n    {\r\n        text: 'Đổi độ cao',\r\n        value: 'customLevelControl',\r\n        color: 'green'\r\n    },\r\n    {\r\n        text: 'Thu phóng bản đồ',\r\n        value: 'customZoomControl',\r\n        color: 'black'\r\n    },\r\n];\r\nvar SCENARIO_LOCATION_METHOD = [\r\n    {\r\n        text: 'Khu Vực',\r\n        value: 'handleClickRegion',\r\n    },\r\n    {\r\n        text: 'Tỉnh Thành',\r\n        value: 'handleClick',\r\n    },\r\n];\r\nvar SCENARIO_DURATION = (_a = {},\r\n    _a[2000] = '2 giây',\r\n    _a[3000] = '3 giây',\r\n    _a[5000] = '5 giây',\r\n    _a[10000] = '10 giây',\r\n    _a[20000] = '20 giây',\r\n    _a[0] = '-',\r\n    _a);\r\nvar SCENARIO_ZOOM = (_b = {},\r\n    _b[7] = '3',\r\n    _b[8] = '5',\r\n    _b[9] = '10',\r\n    _b[10] = '20',\r\n    _b[11] = '11',\r\n    _b);\r\nvar ELEVATION = [\r\n    { label: \"0m\", value: 0, data: \"surface\" },\r\n    { label: \"100m\", value: 1, data: \"975h\" },\r\n    { label: \"600m\", value: 2, data: \"950h\" },\r\n    { label: \"750m\", value: 3, data: \"925h\" },\r\n    { label: \"900m\", value: 4, data: \"900h\" },\r\n    { label: \"1500m\", value: 5, data: \"850h\" },\r\n    { label: \"2000m\", value: 6, data: \"800h\" },\r\n    { label: \"3000m\", value: 7, data: \"700h\" },\r\n    { label: \"4200m\", value: 8, data: \"600h\" },\r\n    { label: \"5500m\", value: 9, data: \"500h\" },\r\n    { label: \"7000m\", value: 10, data: \"400h\" },\r\n    { label: \"9000m\", value: 11, data: \"300h\" },\r\n    { label: \"10km\", value: 12, data: \"250h\" },\r\n];\r\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90ZW1wLy4vc3JjL3BhZ2UvbWFwLXJhZGFyL2NvbXBvbmVudHMvc2NlbmFyaW8vc2NlbmFyaW8tZGVmYXVsdC50cz81YzRmIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFPLElBQU0saUJBQWlCLEdBQUc7SUFDN0I7UUFDSSxNQUFNLEVBQUUsdUJBQXVCO1FBQy9CLE1BQU0sRUFBRSxtQkFBbUI7UUFDM0IsSUFBSSxFQUFFLEtBQUs7UUFDWCxRQUFRLEVBQUUsSUFBSTtLQUNqQjtJQUNEO1FBQ0ksTUFBTSxFQUFFLHVCQUF1QjtRQUMvQixNQUFNLEVBQUUsbUJBQW1CO1FBQzNCLElBQUksRUFBRSxLQUFLO1FBQ1gsUUFBUSxFQUFFLElBQUk7S0FDakI7SUFDRDtRQUNJLE1BQU0sRUFBRSx1QkFBdUI7UUFDL0IsTUFBTSxFQUFFLG1CQUFtQjtRQUMzQixJQUFJLEVBQUUsS0FBSztRQUNYLFFBQVEsRUFBRSxJQUFJO0tBQ2pCO0lBQ0Q7UUFDSSxNQUFNLEVBQUUsdUJBQXVCO1FBQy9CLE1BQU0sRUFBRSxtQkFBbUI7UUFDM0IsSUFBSSxFQUFFLEtBQUs7UUFDWCxRQUFRLEVBQUUsSUFBSTtLQUNqQjtJQUNEO1FBQ0ksTUFBTSxFQUFFLHVCQUF1QjtRQUMvQixNQUFNLEVBQUUsbUJBQW1CO1FBQzNCLElBQUksRUFBRSxLQUFLO1FBQ1gsUUFBUSxFQUFFLElBQUk7S0FDakI7Q0FDSjtBQUNNLElBQU0sZUFBZSxHQUFHO0lBQzNCO1FBQ0ksSUFBSSxFQUFFLGtCQUFrQjtRQUN4QixLQUFLLEVBQUUsdUJBQXVCO1FBQzlCLEtBQUssRUFBRSxNQUFNO0tBQ2hCO0lBQ0Q7UUFDSSxJQUFJLEVBQUUsMEJBQTBCO1FBQ2hDLEtBQUssRUFBRSx3QkFBd0I7UUFDL0IsS0FBSyxFQUFFLE1BQU07S0FDaEI7SUFDRDtRQUNJLElBQUksRUFBRSxZQUFZO1FBQ2xCLEtBQUssRUFBRSxvQkFBb0I7UUFDM0IsS0FBSyxFQUFFLE9BQU87S0FDakI7SUFDRDtRQUNJLElBQUksRUFBRSxrQkFBa0I7UUFDeEIsS0FBSyxFQUFFLG1CQUFtQjtRQUMxQixLQUFLLEVBQUUsT0FBTztLQUNqQjtDQUNKO0FBQ00sSUFBTSx3QkFBd0IsR0FBRztJQUNwQztRQUNJLElBQUksRUFBRSxTQUFTO1FBQ2YsS0FBSyxFQUFFLG1CQUFtQjtLQUM3QjtJQUNEO1FBQ0ksSUFBSSxFQUFFLFlBQVk7UUFDbEIsS0FBSyxFQUFFLGFBQWE7S0FDdkI7Q0FDSjtBQUNNLElBQU0saUJBQWlCO0lBQzFCLEdBQUMsSUFBSSxJQUFHLFFBQVE7SUFDaEIsR0FBQyxJQUFJLElBQUcsUUFBUTtJQUNoQixHQUFDLElBQUksSUFBRyxRQUFRO0lBQ2hCLEdBQUMsS0FBSyxJQUFHLFNBQVM7SUFDbEIsR0FBQyxLQUFLLElBQUcsU0FBUztJQUNsQixHQUFDLENBQUMsSUFBRyxHQUFHO09BQ1g7QUFHTSxJQUFNLGFBQWE7SUFDdEIsR0FBQyxDQUFDLElBQUcsR0FBRztJQUNSLEdBQUMsQ0FBQyxJQUFHLEdBQUc7SUFDUixHQUFDLENBQUMsSUFBRyxJQUFJO0lBQ1QsR0FBQyxFQUFFLElBQUcsSUFBSTtJQUNWLEdBQUMsRUFBRSxJQUFHLElBQUk7T0FDYjtBQUVNLElBQU0sU0FBUyxHQUFHO0lBQ3JCLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUU7SUFDMUMsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRTtJQUN6QyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFO0lBQ3pDLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUU7SUFDekMsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRTtJQUN6QyxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFO0lBQzFDLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUU7SUFDMUMsRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRTtJQUMxQyxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFO0lBQzFDLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUU7SUFDMUMsRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRTtJQUMzQyxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFO0lBQzNDLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUU7Q0FDN0MiLCJmaWxlIjoiNTk0Mi5qcyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjb25zdCBERUZBVUxUX1NDRU5BUklPUyA9IFtcbiAgICB7XG4gICAgICAgIGFjdGlvbjogJ2N1c3RvbUxvY2F0aW9uQ29udHJvbCcsXG4gICAgICAgIG1ldGhvZDogJ2hhbmRsZUNsaWNrUmVnaW9uJyxcbiAgICAgICAgZGF0YTogJ1RCQicsXG4gICAgICAgIGR1cmF0aW9uOiAzMDAwXG4gICAgfSxcbiAgICB7XG4gICAgICAgIGFjdGlvbjogJ2N1c3RvbUxvY2F0aW9uQ29udHJvbCcsXG4gICAgICAgIG1ldGhvZDogJ2hhbmRsZUNsaWNrUmVnaW9uJyxcbiAgICAgICAgZGF0YTogJ0RCQicsXG4gICAgICAgIGR1cmF0aW9uOiA1MDAwXG4gICAgfSxcbiAgICB7XG4gICAgICAgIGFjdGlvbjogJ2N1c3RvbUxvY2F0aW9uQ29udHJvbCcsXG4gICAgICAgIG1ldGhvZDogJ2hhbmRsZUNsaWNrUmVnaW9uJyxcbiAgICAgICAgZGF0YTogJ05UQicsXG4gICAgICAgIGR1cmF0aW9uOiA1MDAwXG4gICAgfSxcbiAgICB7XG4gICAgICAgIGFjdGlvbjogJ2N1c3RvbUxvY2F0aW9uQ29udHJvbCcsXG4gICAgICAgIG1ldGhvZDogJ2hhbmRsZUNsaWNrUmVnaW9uJyxcbiAgICAgICAgZGF0YTogJ0ROQicsXG4gICAgICAgIGR1cmF0aW9uOiA1MDAwXG4gICAgfSxcbiAgICB7XG4gICAgICAgIGFjdGlvbjogJ2N1c3RvbUxvY2F0aW9uQ29udHJvbCcsXG4gICAgICAgIG1ldGhvZDogJ2hhbmRsZUNsaWNrUmVnaW9uJyxcbiAgICAgICAgZGF0YTogJ1ROQicsXG4gICAgICAgIGR1cmF0aW9uOiA1MDAwXG4gICAgfSxcbl1cbmV4cG9ydCBjb25zdCBTQ0VOQVJJT19BQ1RJT04gPSBbXG4gICAge1xuICAgICAgICB0ZXh0OiAnRGkgY2h1eeG7g24gYuG6o24gxJHhu5MnLFxuICAgICAgICB2YWx1ZTogJ2N1c3RvbUxvY2F0aW9uQ29udHJvbCcsXG4gICAgICAgIGNvbG9yOiAnYmx1ZSdcbiAgICB9LFxuICAgIHtcbiAgICAgICAgdGV4dDogJ8SQ4buVaSB0cuG6oW5nIHRow6FpIHRo4budaSB0aeG6v3QnLFxuICAgICAgICB2YWx1ZTogJ2N1c3RvbU1hcFN0YXR1c0NvbnRyb2wnLFxuICAgICAgICBjb2xvcjogJ3BpbmsnXG4gICAgfSxcbiAgICB7XG4gICAgICAgIHRleHQ6ICfEkOG7lWkgxJHhu5kgY2FvJyxcbiAgICAgICAgdmFsdWU6ICdjdXN0b21MZXZlbENvbnRyb2wnLFxuICAgICAgICBjb2xvcjogJ2dyZWVuJ1xuICAgIH0sXG4gICAge1xuICAgICAgICB0ZXh0OiAnVGh1IHBow7NuZyBi4bqjbiDEkeG7kycsXG4gICAgICAgIHZhbHVlOiAnY3VzdG9tWm9vbUNvbnRyb2wnLFxuICAgICAgICBjb2xvcjogJ2JsYWNrJ1xuICAgIH0sXG5dXG5leHBvcnQgY29uc3QgU0NFTkFSSU9fTE9DQVRJT05fTUVUSE9EID0gW1xuICAgIHtcbiAgICAgICAgdGV4dDogJ0todSBW4buxYycsXG4gICAgICAgIHZhbHVlOiAnaGFuZGxlQ2xpY2tSZWdpb24nLFxuICAgIH0sXG4gICAge1xuICAgICAgICB0ZXh0OiAnVOG7iW5oIFRow6BuaCcsXG4gICAgICAgIHZhbHVlOiAnaGFuZGxlQ2xpY2snLFxuICAgIH0sXG5dXG5leHBvcnQgY29uc3QgU0NFTkFSSU9fRFVSQVRJT04gPSB7XG4gICAgWzIwMDBdOiAnMiBnacOieScsXG4gICAgWzMwMDBdOiAnMyBnacOieScsXG4gICAgWzUwMDBdOiAnNSBnacOieScsXG4gICAgWzEwMDAwXTogJzEwIGdpw6J5JyxcbiAgICBbMjAwMDBdOiAnMjAgZ2nDonknLFxuICAgIFswXTogJy0nLFxufVxuXG5cbmV4cG9ydCBjb25zdCBTQ0VOQVJJT19aT09NID0ge1xuICAgIFs3XTogJzMnLFxuICAgIFs4XTogJzUnLFxuICAgIFs5XTogJzEwJyxcbiAgICBbMTBdOiAnMjAnLFxuICAgIFsxMV06ICcxMScsXG59XG5cbmV4cG9ydCBjb25zdCBFTEVWQVRJT04gPSBbXG4gICAgeyBsYWJlbDogXCIwbVwiLCB2YWx1ZTogMCwgZGF0YTogXCJzdXJmYWNlXCIgfSxcbiAgICB7IGxhYmVsOiBcIjEwMG1cIiwgdmFsdWU6IDEsIGRhdGE6IFwiOTc1aFwiIH0sXG4gICAgeyBsYWJlbDogXCI2MDBtXCIsIHZhbHVlOiAyLCBkYXRhOiBcIjk1MGhcIiB9LFxuICAgIHsgbGFiZWw6IFwiNzUwbVwiLCB2YWx1ZTogMywgZGF0YTogXCI5MjVoXCIgfSxcbiAgICB7IGxhYmVsOiBcIjkwMG1cIiwgdmFsdWU6IDQsIGRhdGE6IFwiOTAwaFwiIH0sXG4gICAgeyBsYWJlbDogXCIxNTAwbVwiLCB2YWx1ZTogNSwgZGF0YTogXCI4NTBoXCIgfSxcbiAgICB7IGxhYmVsOiBcIjIwMDBtXCIsIHZhbHVlOiA2LCBkYXRhOiBcIjgwMGhcIiB9LFxuICAgIHsgbGFiZWw6IFwiMzAwMG1cIiwgdmFsdWU6IDcsIGRhdGE6IFwiNzAwaFwiIH0sXG4gICAgeyBsYWJlbDogXCI0MjAwbVwiLCB2YWx1ZTogOCwgZGF0YTogXCI2MDBoXCIgfSxcbiAgICB7IGxhYmVsOiBcIjU1MDBtXCIsIHZhbHVlOiA5LCBkYXRhOiBcIjUwMGhcIiB9LFxuICAgIHsgbGFiZWw6IFwiNzAwMG1cIiwgdmFsdWU6IDEwLCBkYXRhOiBcIjQwMGhcIiB9LFxuICAgIHsgbGFiZWw6IFwiOTAwMG1cIiwgdmFsdWU6IDExLCBkYXRhOiBcIjMwMGhcIiB9LFxuICAgIHsgbGFiZWw6IFwiMTBrbVwiLCB2YWx1ZTogMTIsIGRhdGE6IFwiMjUwaFwiIH0sXG5dXG4iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///5942\n")}}]);