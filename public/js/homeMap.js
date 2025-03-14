/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/homeMap.js":
/*!***************************!*\
  !*** ./src/js/homeMap.js ***!
  \***************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n(function() {\r\n    const lat = 4.7574479;\r\n    const lng = -74.1122502;\r\n    const map = L.map('home-map').setView([lat, lng], 2);\r\n    const markers = new L.FeatureGroup().addTo(map)\r\n\r\n    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {\r\n        attribution: '&copy; <a href=\"https://www.openstreetmap.org/copyright\">OpenStreetMap</a> contributors'\r\n    }).addTo(map);\r\n\r\n    const getProperties = async () => {\r\n        try {\r\n            const url = '/api/properties'\r\n            const response = await fetch(url);\r\n            const properties = await response.json();\r\n            showProperties(properties);\r\n\r\n        } catch (error) {\r\n            console.log(error);\r\n        }\r\n    }\r\n\r\n    const showProperties = properties => {\r\n        properties.forEach(property => {\r\n            //Add Pines\r\n            const marker = new L.marker([property?.lat, property?.lng], {\r\n                autoPan: true\r\n            }).addTo(map).bindPopup(`\r\n                <strong class=\"text-violet-600 text-lg\">${property.category.name}</strong>\r\n                <h2 class=\"text-xl font-bold my-2 text-gray-500\">${property?.title}</h2>\r\n                <img src=\"/uploads/${property?.image}\" alt=\"Image of property ${property.title}\">\r\n                <p class=\"text-fucsiaPalet1 font-bold block text-center\">${property.price.name}</p>\r\n                <a href=\"/property/${property.id}\" class=\"bg-violet-600 block p-2 text-center rounded-md uppercase text-white\">See property</a>\r\n            `)\r\n            markers.addLayer(marker)\r\n        })\r\n    }\r\n\r\n    getProperties();\r\n})()\n\n//# sourceURL=webpack://real_states/./src/js/homeMap.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/js/homeMap.js"](0, __webpack_exports__, __webpack_require__);
/******/ 	
/******/ })()
;