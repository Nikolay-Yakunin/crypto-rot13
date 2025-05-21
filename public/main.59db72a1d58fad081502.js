/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/app.js":
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ initApp)
/* harmony export */ });
/* harmony import */ var _rot13_rot13_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./rot13/rot13.js */ "./src/rot13/rot13.js");

var DEBOUNCE_DELAY = 300;
function setupAutoResize(el) {
  el.classList.add('auto');
  var adjust = function adjust() {
    el.style.height = 'auto';
    el.style.height = el.scrollHeight + 'px';
  };
  el.addEventListener('input', adjust);
  adjust();
}
function debounce(fn, delay) {
  var timer;
  return function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    clearTimeout(timer);
    timer = setTimeout(function () {
      return fn.apply(void 0, args);
    }, delay);
  };
}
function updateOutput() {
  var textarea = document.getElementById('textInput');
  var radios = Array.from(document.getElementsByName('mode'));
  var output = document.getElementById('textOutput');
  var text = textarea.value;
  var mode = radios.find(function (r) {
    return r.checked;
  }).value;
  output.textContent = mode === 'encrypt' ? (0,_rot13_rot13_js__WEBPACK_IMPORTED_MODULE_0__.cryptRot13)(text) : (0,_rot13_rot13_js__WEBPACK_IMPORTED_MODULE_0__.decryptRot13)(text);
}
function setupCopy() {
  var output = document.getElementById('textOutput');
  output.addEventListener('click', function () {
    navigator.clipboard.writeText(output.textContent).then(function () {
      return console.log('Текст скопирован!');
    })["catch"](function (err) {
      return console.error('Ошибка копирования:', err);
    });
  });
}
function initApp() {
  var textarea = document.getElementById('textInput');
  var radios = Array.from(document.getElementsByName('mode'));
  setupAutoResize(textarea);
  setupCopy();
  var debouncedUpdate = debounce(updateOutput, DEBOUNCE_DELAY);
  textarea.addEventListener('input', debouncedUpdate);
  radios.forEach(function (r) {
    return r.addEventListener('change', debouncedUpdate);
  });
  updateOutput();
}

/***/ }),

/***/ "./src/rot13/data.js":
/*!***************************!*\
  !*** ./src/rot13/data.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   alphabetEngLower: () => (/* binding */ alphabetEngLower),
/* harmony export */   alphabetEngUpper: () => (/* binding */ alphabetEngUpper),
/* harmony export */   alphabetRuLower: () => (/* binding */ alphabetRuLower),
/* harmony export */   alphabetRuUpper: () => (/* binding */ alphabetRuUpper)
/* harmony export */ });
var alphabetEngUpper = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
var alphabetEngLower = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
var alphabetRuUpper = ['А', 'Б', 'В', 'Г', 'Д', 'Е', 'Ё', 'Ж', 'З', 'И', 'Й', 'К', 'Л', 'М', 'Н', 'О', 'П', 'Р', 'С', 'Т', 'У', 'Ф', 'Х', 'Ц', 'Ч', 'Ш', 'Щ', 'Ъ', 'Ы', 'Ь', 'Э', 'Ю', 'Я'];
var alphabetRuLower = ['а', 'б', 'в', 'г', 'д', 'е', 'ё', 'ж', 'з', 'и', 'й', 'к', 'л', 'м', 'н', 'о', 'п', 'р', 'с', 'т', 'у', 'ф', 'х', 'ц', 'ч', 'ш', 'щ', 'ъ', 'ы', 'ь', 'э', 'ю', 'я'];

/***/ }),

/***/ "./src/rot13/rot13.js":
/*!****************************!*\
  !*** ./src/rot13/rot13.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   cryptChar: () => (/* binding */ cryptChar),
/* harmony export */   cryptRot13: () => (/* binding */ cryptRot13),
/* harmony export */   decryptChar: () => (/* binding */ decryptChar),
/* harmony export */   decryptRot13: () => (/* binding */ decryptRot13)
/* harmony export */ });
/* harmony import */ var _data_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./data.js */ "./src/rot13/data.js");
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }

var alphabets = [{
  set: _data_js__WEBPACK_IMPORTED_MODULE_0__.alphabetEngUpper,
  shift: 13
}, {
  set: _data_js__WEBPACK_IMPORTED_MODULE_0__.alphabetEngLower,
  shift: 13
}, {
  set: _data_js__WEBPACK_IMPORTED_MODULE_0__.alphabetRuUpper,
  shift: 13
}, {
  set: _data_js__WEBPACK_IMPORTED_MODULE_0__.alphabetRuLower,
  shift: 13
}];
function shiftChar(alphabet, ch, shift) {
  for (var i = 0; i < alphabet.length; i++) {
    if (alphabet[i] === ch) {
      var len = alphabet.length;
      var newIdx = (i + shift % len + len) % len;
      return alphabet[newIdx];
    }
  }
  return ch;
}
function cryptRot13(text) {
  var result = "";
  for (var i = 0; i < text.length; i++) {
    result += cryptChar(text[i]);
  }
  return result;
}
function cryptChar(ch) {
  var _iterator = _createForOfIteratorHelper(alphabets),
    _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var _step$value = _step.value,
        set = _step$value.set,
        shift = _step$value.shift;
      var res = shiftChar(set, ch, shift);
      if (res !== ch) return res;
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
  return ch;
}
function decryptRot13(text) {
  var result = "";
  for (var i = 0; i < text.length; i++) {
    result += decryptChar(text[i]);
  }
  return result;
}
function decryptChar(ch) {
  var _iterator2 = _createForOfIteratorHelper(alphabets),
    _step2;
  try {
    for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
      var _step2$value = _step2.value,
        set = _step2$value.set,
        shift = _step2$value.shift;
      var res = shiftChar(set, ch, -shift);
      if (res !== ch) return res;
    }
  } catch (err) {
    _iterator2.e(err);
  } finally {
    _iterator2.f();
  }
  return ch;
}

/***/ }),

/***/ "./src/styles/styles.css":
/*!*******************************!*\
  !*** ./src/styles/styles.css ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
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
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _styles_styles_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./styles/styles.css */ "./src/styles/styles.css");
/* harmony import */ var _app_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./app.js */ "./src/app.js");


document.addEventListener('DOMContentLoaded', _app_js__WEBPACK_IMPORTED_MODULE_1__["default"]);
})();

/******/ })()
;
//# sourceMappingURL=main.59db72a1d58fad081502.js.map