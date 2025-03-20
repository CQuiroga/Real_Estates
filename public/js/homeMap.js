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

eval("__webpack_require__.r(__webpack_exports__);\n(function() {\n    const lat = 4.7574479;\n    const lng = -74.1122502;\n    const map = L.map('home-map').setView([lat, lng], 2);\n    const markers = new L.FeatureGroup().addTo(map);\n\n    let properties = [];\n\n    // Filters\n    const filters = {\n        category: '', \n        price: ''\n    }\n    \n\n    const categoriesSelect = document.querySelector('#categories');\n    const pricesSelect = document.querySelector('#prices');\n\n    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {\n        attribution: '&copy; <a href=\"https://www.openstreetmap.org/copyright\">OpenStreetMap</a> contributors'\n    }).addTo(map);\n\n    // Filters by category and price\n    categoriesSelect.addEventListener('change', e => {\n        filters.category = +e.target.value;\n        filterProperties();\n    });\n\n    pricesSelect.addEventListener('change', e => {\n        filters.price = +e.target.value;\n        filterProperties();\n    });\n\n    const getProperties = async () => {\n        try {\n            const url = '/api/properties'\n            const response = await fetch(url);\n            properties = await response.json();\n            showProperties(properties);\n\n        } catch (error) {\n            console.log(error);\n        }\n    }\n\n    const showProperties = properties => {\n        // Clear previous markers\n        markers.clearLayers();\n\n        properties.forEach(property => {\n            //Add Pines\n            const marker = new L.marker([property?.lat, property?.lng], {\n                autoPan: true\n            }).addTo(map).bindPopup(`\n                <strong class=\"text-violet-600 text-lg\">${property.category.name}</strong>\n                <h2 class=\"text-xl font-bold my-2 text-gray-500\">${property?.title}</h2>\n                <img src=\"/uploads/${property?.image}\" alt=\"Image of property ${property.title}\">\n                <p class=\"text-fucsiaPalet1 font-bold block text-center\">${property.price.name}</p>\n                <a href=\"/property/${property.id}\" class=\"bg-violet-600 block p-2 text-center rounded-md uppercase text-white\">See property</a>\n            `)\n            markers.addLayer(marker)\n        })\n    }\n\n    const filterProperties = () => {\n        const result = properties.filter( filterCategory ).filter( filterPrices );\n        showProperties(result);\n\n    }\n\n    const filterCategory = property => filters.category ? property.categoryId === filters.category : property;\n\n    const filterPrices = property => filters.price ? property.priceId === filters.price : property\n\n    getProperties();\n})()\n\n//# sourceURL=webpack://real_states/./src/js/homeMap.js?");

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