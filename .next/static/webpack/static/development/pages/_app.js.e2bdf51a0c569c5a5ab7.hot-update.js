webpackHotUpdate("static/development/pages/_app.js",{

/***/ "./containers/AppLayout.js":
/*!*********************************!*\
  !*** ./containers/AppLayout.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/link */ \"./node_modules/next/link.js\");\n/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! prop-types */ \"./node_modules/prop-types/index.js\");\n/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-redux */ \"./node_modules/react-redux/es/index.js\");\n/* harmony import */ var _material_ui_icons__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @material-ui/icons */ \"./node_modules/@material-ui/icons/esm/index.js\");\n/* harmony import */ var _reducers_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../reducers/component */ \"./reducers/component.js\");\nvar _this = undefined,\n    _jsxFileName = \"/Users/anjoy/connected/react-web/containers/AppLayout.js\",\n    _s = $RefreshSig$();\n\nvar __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;\n\n\n\n\n\n\n\nvar DummyProfile = function DummyProfile() {\n  return __jsx(\"img\", {\n    src: \"https://media.vlpt.us/images/yujo/profile/053c9bee-1076-418c-808d-f9a1b88dc445/KakaoTalk_20200229_162658088.jpg?w=240\",\n    __self: _this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 12,\n      columnNumber: 3\n    }\n  });\n};\n\n_c = DummyProfile;\n\nvar AppLayout = function AppLayout(_ref) {\n  _s();\n\n  var children = _ref.children;\n\n  var _useSelector = Object(react_redux__WEBPACK_IMPORTED_MODULE_3__[\"useSelector\"])(function (state) {\n    return state.component;\n  }),\n      openChat = _useSelector.openChat;\n\n  var dispatch = Object(react_redux__WEBPACK_IMPORTED_MODULE_3__[\"useDispatch\"])();\n  var openChatComponent = {\n    transform: \"translateY(\".concat(openChat ? 0 : 120, \"%)\")\n  };\n  var onClickChatBtn = Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useCallback\"])(function (e) {\n    e.preventDefault();\n\n    if (openChat) {\n      dispatch({\n        type: _reducers_component__WEBPACK_IMPORTED_MODULE_5__[\"CLOSE_CHAT\"]\n      });\n    } else {\n      dispatch({\n        type: _reducers_component__WEBPACK_IMPORTED_MODULE_5__[\"OPEN_CHAT\"]\n      });\n    }\n  }, [openChat]);\n  return __jsx(\"div\", {\n    id: \"wrapper\",\n    __self: _this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 39,\n      columnNumber: 3\n    }\n  }, __jsx(\"div\", {\n    id: \"page-container\",\n    __self: _this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 40,\n      columnNumber: 4\n    }\n  }, __jsx(\"header\", {\n    id: \"nav-header\",\n    __self: _this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 41,\n      columnNumber: 5\n    }\n  }, __jsx(\"div\", {\n    className: \"menu-navigation\",\n    __self: _this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 42,\n      columnNumber: 6\n    }\n  }, __jsx(\"div\", {\n    className: \"nav-logo-btn\",\n    __self: _this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 43,\n      columnNumber: 7\n    }\n  }, __jsx(next_link__WEBPACK_IMPORTED_MODULE_1___default.a, {\n    href: \"/\",\n    __self: _this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 44,\n      columnNumber: 8\n    }\n  }, __jsx(\"a\", {\n    __self: _this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 45,\n      columnNumber: 9\n    }\n  }, __jsx(\"img\", {\n    src: \"./images/long-logo.svg\",\n    height: \"30px\",\n    __self: _this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 46,\n      columnNumber: 10\n    }\n  })))), __jsx(\"div\", {\n    className: \"nav-link-btn\",\n    __self: _this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 50,\n      columnNumber: 7\n    }\n  }, __jsx(next_link__WEBPACK_IMPORTED_MODULE_1___default.a, {\n    href: \"/\",\n    __self: _this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 51,\n      columnNumber: 8\n    }\n  }, __jsx(\"a\", {\n    __self: _this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 52,\n      columnNumber: 9\n    }\n  }, \"\\uBAA8\\uC9D1 \\uC911\\uC778 \\uD504\\uB85C\\uC81D\\uD2B8\"))), __jsx(\"div\", {\n    className: \"nav-link-btn\",\n    __self: _this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 57,\n      columnNumber: 7\n    }\n  }, __jsx(next_link__WEBPACK_IMPORTED_MODULE_1___default.a, {\n    href: \"/\",\n    __self: _this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 58,\n      columnNumber: 8\n    }\n  }, __jsx(\"a\", {\n    __self: _this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 59,\n      columnNumber: 9\n    }\n  }, \"\\uC5B4\\uB5A0\\uD55C \\uAE30\\uB2A5 \\uBC84\\uD2BC\"))), __jsx(\"button\", {\n    type: \"button\",\n    className: \"nav-profile-btn\",\n    __self: _this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 64,\n      columnNumber: 7\n    }\n  }, __jsx(DummyProfile, {\n    __self: _this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 65,\n      columnNumber: 8\n    }\n  })))), __jsx(\"main\", {\n    className: \"page-wrap\",\n    __self: _this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 69,\n      columnNumber: 5\n    }\n  }, __jsx(\"div\", {\n    className: \"page-inner-container\",\n    __self: _this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 70,\n      columnNumber: 6\n    }\n  }, children)), !openChat && __jsx(\"button\", {\n    onClick: onClickChatBtn,\n    type: \"button\",\n    className: \"chat-btn-container\",\n    __self: _this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 75,\n      columnNumber: 6\n    }\n  }, __jsx(_material_ui_icons__WEBPACK_IMPORTED_MODULE_4__[\"Chat\"], {\n    __self: _this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 76,\n      columnNumber: 7\n    }\n  })), __jsx(\"div\", {\n    id: \"chat-wrap\",\n    style: openChatComponent,\n    __self: _this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 79,\n      columnNumber: 5\n    }\n  }, __jsx(\"div\", {\n    className: \"chat-header\",\n    __self: _this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 80,\n      columnNumber: 6\n    }\n  }, \"Chat room\", __jsx(\"button\", {\n    onClick: onClickChatBtn,\n    __self: _this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 82,\n      columnNumber: 7\n    }\n  }, __jsx(_material_ui_icons__WEBPACK_IMPORTED_MODULE_4__[\"Close\"], {\n    __self: _this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 83,\n      columnNumber: 8\n    }\n  }))), __jsx(\"div\", {\n    className: \"chat-list\",\n    __self: _this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 86,\n      columnNumber: 6\n    }\n  }, __jsx(\"div\", {\n    className: \"chat-room\",\n    __self: _this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 87,\n      columnNumber: 7\n    }\n  }, __jsx(DummyProfile, {\n    __self: _this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 88,\n      columnNumber: 8\n    }\n  }), __jsx(\"div\", {\n    className: \"chat-recent-message\",\n    __self: _this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 89,\n      columnNumber: 8\n    }\n  }, __jsx(\"p\", {\n    __self: _this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 90,\n      columnNumber: 9\n    }\n  }, \"\\uAC74\\uAC15\\uD558\\uC138\\uC694?\"))), __jsx(\"div\", {\n    __self: _this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 95,\n      columnNumber: 7\n    }\n  }, \"dummy\"), __jsx(\"div\", {\n    __self: _this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 96,\n      columnNumber: 7\n    }\n  }, \"dummy\"), __jsx(\"div\", {\n    __self: _this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 97,\n      columnNumber: 7\n    }\n  }, \"dummy\"), __jsx(\"div\", {\n    __self: _this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 98,\n      columnNumber: 7\n    }\n  }, \"dummy\")))));\n};\n\n_s(AppLayout, \"gNDk2rGrQz4xh7Vg/pn+WxH4mb8=\", false, function () {\n  return [react_redux__WEBPACK_IMPORTED_MODULE_3__[\"useSelector\"], react_redux__WEBPACK_IMPORTED_MODULE_3__[\"useDispatch\"]];\n});\n\n_c2 = AppLayout;\nAppLayout.propTypes = {};\n/* harmony default export */ __webpack_exports__[\"default\"] = (AppLayout);\n\nvar _c, _c2;\n\n$RefreshReg$(_c, \"DummyProfile\");\n$RefreshReg$(_c2, \"AppLayout\");\n\n;\n    var _a, _b;\n    // Legacy CSS implementations will `eval` browser code in a Node.js context\n    // to extract CSS. For backwards compatibility, we need to check we're in a\n    // browser context before continuing.\n    if (typeof self !== 'undefined' &&\n        // AMP / No-JS mode does not inject these helpers:\n        '$RefreshHelpers$' in self) {\n        var currentExports_1 = module.__proto__.exports;\n        var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n        // This cannot happen in MainTemplate because the exports mismatch between\n        // templating and execution.\n        self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports_1, module.i);\n        // A module can be accepted automatically based on its exports, e.g. when\n        // it is a Refresh Boundary.\n        if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports_1)) {\n            // Save the previous exports on update so we can compare the boundary\n            // signatures.\n            module.hot.dispose(function (data) {\n                data.prevExports = currentExports_1;\n            });\n            // Unconditionally accept an update to this module, we'll check if it's\n            // still a Refresh Boundary later.\n            module.hot.accept();\n            // This field is set when the previous version of this module was a\n            // Refresh Boundary, letting us know we need to check for invalidation or\n            // enqueue an update.\n            if (prevExports !== null) {\n                // A boundary can become ineligible if its exports are incompatible\n                // with the previous exports.\n                //\n                // For example, if you add/remove/change exports, we'll want to\n                // re-execute the importing modules, and force those components to\n                // re-render. Similarly, if you convert a class component to a\n                // function, we want to invalidate the boundary.\n                if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports_1)) {\n                    module.hot.invalidate();\n                }\n                else {\n                    self.$RefreshHelpers$.scheduleUpdate();\n                }\n            }\n        }\n        else {\n            // Since we just executed the code for the module, it's possible that the\n            // new exports made it ineligible for being a boundary.\n            // We only care about the case when we were _previously_ a boundary,\n            // because we already accepted this update (accidental side effect).\n            var isNoLongerABoundary = prevExports !== null;\n            if (isNoLongerABoundary) {\n                module.hot.invalidate();\n            }\n        }\n    }\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node_modules/webpack/buildin/harmony-module.js */ \"./node_modules/webpack/buildin/harmony-module.js\")(module)))//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9jb250YWluZXJzL0FwcExheW91dC5qcz9mZTg5Il0sIm5hbWVzIjpbIkR1bW15UHJvZmlsZSIsIkFwcExheW91dCIsImNoaWxkcmVuIiwidXNlU2VsZWN0b3IiLCJzdGF0ZSIsImNvbXBvbmVudCIsIm9wZW5DaGF0IiwiZGlzcGF0Y2giLCJ1c2VEaXNwYXRjaCIsIm9wZW5DaGF0Q29tcG9uZW50IiwidHJhbnNmb3JtIiwib25DbGlja0NoYXRCdG4iLCJ1c2VDYWxsYmFjayIsImUiLCJwcmV2ZW50RGVmYXVsdCIsInR5cGUiLCJDTE9TRV9DSEFUIiwiT1BFTl9DSEFUIiwicHJvcFR5cGVzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFFQTtBQUVBO0FBQ0E7O0FBRUEsSUFBTUEsWUFBWSxHQUFHLFNBQWZBLFlBQWUsR0FBTTtBQUMxQixTQUNDO0FBQUssT0FBRyxFQUFDLHVIQUFUO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsSUFERDtBQUdBLENBSkQ7O0tBQU1BLFk7O0FBTU4sSUFBTUMsU0FBUyxHQUFHLFNBQVpBLFNBQVksT0FBa0I7QUFBQTs7QUFBQSxNQUFmQyxRQUFlLFFBQWZBLFFBQWU7O0FBQUEscUJBQ2RDLCtEQUFXLENBQUMsVUFBQUMsS0FBSztBQUFBLFdBQUVBLEtBQUssQ0FBQ0MsU0FBUjtBQUFBLEdBQU4sQ0FERztBQUFBLE1BQzNCQyxRQUQyQixnQkFDM0JBLFFBRDJCOztBQUduQyxNQUFNQyxRQUFRLEdBQUdDLCtEQUFXLEVBQTVCO0FBRUEsTUFBTUMsaUJBQWlCLEdBQUc7QUFDekJDLGFBQVMsdUJBQWdCSixRQUFRLEdBQUcsQ0FBSCxHQUFPLEdBQS9CO0FBRGdCLEdBQTFCO0FBSUEsTUFBTUssY0FBYyxHQUFHQyx5REFBVyxDQUFDLFVBQUNDLENBQUQsRUFBTztBQUN6Q0EsS0FBQyxDQUFDQyxjQUFGOztBQUNBLFFBQUlSLFFBQUosRUFBYztBQUNiQyxj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QUEsSUFERCxDQUZELENBREQsRUFPQztBQUFLLGFBQVMsRUFBQyxXQUFmO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0FDQztBQUFLLGFBQVMsRUFBQyxXQUFmO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0FDQyxNQUFDLFlBQUQ7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxJQURELEVBRUM7QUFBSyxhQUFTLEVBQUMscUJBQWY7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQUNDO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsdUNBREQsQ0FGRCxDQURELEVBU0M7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxhQVRELEVBVUM7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxhQVZELEVBV0M7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxhQVhELEVBWUM7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxhQVpELENBUEQsQ0F2Q0QsQ0FERCxDQUREO0FBa0VBLENBeEZEOztHQUFNVixTO1VBQ2dCRSx1RCxFQUVKSyx1RDs7O01BSFpQLFM7QUEwRk5BLFNBQVMsQ0FBQ2lCLFNBQVYsR0FBc0IsRUFBdEI7QUFJZWpCLHdFQUFmIiwiZmlsZSI6Ii4vY29udGFpbmVycy9BcHBMYXlvdXQuanMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgdXNlQ2FsbGJhY2sgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgTGluayBmcm9tICduZXh0L2xpbmsnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcblxuaW1wb3J0IHsgdXNlU2VsZWN0b3IsIHVzZURpc3BhdGNoIH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuXG5pbXBvcnQgeyBDaGF0LCBDbG9zZSB9IGZyb20gJ0BtYXRlcmlhbC11aS9pY29ucyc7XG5pbXBvcnQgeyBDTE9TRV9DSEFULCBPUEVOX0NIQVQgfSBmcm9tICcuLi9yZWR1Y2Vycy9jb21wb25lbnQnO1xuXG5jb25zdCBEdW1teVByb2ZpbGUgPSAoKSA9PiB7XG5cdHJldHVybiAoXG5cdFx0PGltZyBzcmM9XCJodHRwczovL21lZGlhLnZscHQudXMvaW1hZ2VzL3l1am8vcHJvZmlsZS8wNTNjOWJlZS0xMDc2LTQxOGMtODA4ZC1mOWExYjg4ZGM0NDUvS2FrYW9UYWxrXzIwMjAwMjI5XzE2MjY1ODA4OC5qcGc/dz0yNDBcIiAvPlxuXHQpO1xufVxuXG5jb25zdCBBcHBMYXlvdXQgPSAoeyBjaGlsZHJlbiB9KSA9PiB7XG5cdGNvbnN0IHsgb3BlbkNoYXQgfSA9IHVzZVNlbGVjdG9yKHN0YXRlPT5zdGF0ZS5jb21wb25lbnQpO1xuXG5cdGNvbnN0IGRpc3BhdGNoID0gdXNlRGlzcGF0Y2goKTtcblxuXHRjb25zdCBvcGVuQ2hhdENvbXBvbmVudCA9IHtcblx0XHR0cmFuc2Zvcm06IGB0cmFuc2xhdGVZKCR7b3BlbkNoYXQgPyAwIDogMTIwfSUpYFxuXHR9XG5cblx0Y29uc3Qgb25DbGlja0NoYXRCdG4gPSB1c2VDYWxsYmFjaygoZSkgPT4ge1xuXHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRpZiAob3BlbkNoYXQpIHtcblx0XHRcdGRpc3BhdGNoKHtcblx0XHRcdFx0dHlwZTogQ0xPU0VfQ0hBVFxuXHRcdFx0fSlcblx0XHR9IGVsc2Uge1xuXHRcdFx0ZGlzcGF0Y2goe1xuXHRcdFx0XHR0eXBlOiBPUEVOX0NIQVRcblx0XHRcdH0pXG5cdFx0fVxuXHR9LCBbb3BlbkNoYXRdKTtcblxuXHRyZXR1cm4gKFxuXHRcdDxkaXYgaWQ9XCJ3cmFwcGVyXCI+XG5cdFx0XHQ8ZGl2IGlkPVwicGFnZS1jb250YWluZXJcIj5cblx0XHRcdFx0PGhlYWRlciBpZD1cIm5hdi1oZWFkZXJcIj5cblx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cIm1lbnUtbmF2aWdhdGlvblwiPlxuXHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJuYXYtbG9nby1idG5cIj5cblx0XHRcdFx0XHRcdFx0PExpbmsgaHJlZj1cIi9cIj5cblx0XHRcdFx0XHRcdFx0XHQ8YT5cblx0XHRcdFx0XHRcdFx0XHRcdDxpbWcgc3JjPVwiLi9pbWFnZXMvbG9uZy1sb2dvLnN2Z1wiIGhlaWdodD1cIjMwcHhcIi8+XG5cdFx0XHRcdFx0XHRcdFx0PC9hPlxuXHRcdFx0XHRcdFx0XHQ8L0xpbms+XG5cdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwibmF2LWxpbmstYnRuXCI+XG5cdFx0XHRcdFx0XHRcdDxMaW5rIGhyZWY9XCIvXCI+XG5cdFx0XHRcdFx0XHRcdFx0PGE+XG5cdFx0XHRcdFx0XHRcdFx0XHTrqqjsp5Eg7KSR7J24IO2UhOuhnOygne2KuFxuXHRcdFx0XHRcdFx0XHRcdDwvYT5cblx0XHRcdFx0XHRcdFx0PC9MaW5rPlxuXHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cIm5hdi1saW5rLWJ0blwiPlxuXHRcdFx0XHRcdFx0XHQ8TGluayBocmVmPVwiL1wiPlxuXHRcdFx0XHRcdFx0XHRcdDxhPlxuXHRcdFx0XHRcdFx0XHRcdFx07Ja065ag7ZWcIOq4sOuKpSDrsoTtirxcblx0XHRcdFx0XHRcdFx0XHQ8L2E+XG5cdFx0XHRcdFx0XHRcdDwvTGluaz5cblx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdFx0PGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3NOYW1lPVwibmF2LXByb2ZpbGUtYnRuXCI+XG5cdFx0XHRcdFx0XHRcdDxEdW1teVByb2ZpbGUgLz5cblx0XHRcdFx0XHRcdDwvYnV0dG9uPlxuXHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHQ8L2hlYWRlcj5cblx0XHRcdFx0PG1haW4gY2xhc3NOYW1lPVwicGFnZS13cmFwXCI+XG5cdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJwYWdlLWlubmVyLWNvbnRhaW5lclwiPlxuXHRcdFx0XHRcdFx0e2NoaWxkcmVufVxuXHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHQ8L21haW4+XG5cdFx0XHRcdHsgIW9wZW5DaGF0ICYmXG5cdFx0XHRcdFx0PGJ1dHRvbiBvbkNsaWNrPXtvbkNsaWNrQ2hhdEJ0bn0gdHlwZT1cImJ1dHRvblwiIGNsYXNzTmFtZT1cImNoYXQtYnRuLWNvbnRhaW5lclwiPlxuXHRcdFx0XHRcdFx0PENoYXQgLz5cblx0XHRcdFx0XHQ8L2J1dHRvbj5cblx0XHRcdFx0fVxuXHRcdFx0XHQ8ZGl2IGlkPVwiY2hhdC13cmFwXCIgc3R5bGU9e29wZW5DaGF0Q29tcG9uZW50fT5cblx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImNoYXQtaGVhZGVyXCI+XG5cdFx0XHRcdFx0XHRDaGF0IHJvb21cblx0XHRcdFx0XHRcdDxidXR0b24gb25DbGljaz17b25DbGlja0NoYXRCdG59PlxuXHRcdFx0XHRcdFx0XHQ8Q2xvc2UgLz5cblx0XHRcdFx0XHRcdDwvYnV0dG9uPlxuXHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiY2hhdC1saXN0XCI+XG5cdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImNoYXQtcm9vbVwiPlxuXHRcdFx0XHRcdFx0XHQ8RHVtbXlQcm9maWxlIC8+XG5cdFx0XHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiY2hhdC1yZWNlbnQtbWVzc2FnZVwiPlxuXHRcdFx0XHRcdFx0XHRcdDxwPlxuXHRcdFx0XHRcdFx0XHRcdFx06rG06rCV7ZWY7IS47JqUP1xuXHRcdFx0XHRcdFx0XHRcdDwvcD5cblx0XHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHRcdDxkaXY+ZHVtbXk8L2Rpdj5cblx0XHRcdFx0XHRcdDxkaXY+ZHVtbXk8L2Rpdj5cblx0XHRcdFx0XHRcdDxkaXY+ZHVtbXk8L2Rpdj5cblx0XHRcdFx0XHRcdDxkaXY+ZHVtbXk8L2Rpdj5cblx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHQ8L2Rpdj5cblx0XHQ8L2Rpdj5cblx0KTtcbn07XG5cbkFwcExheW91dC5wcm9wVHlwZXMgPSB7XG5cbn07XG5cbmV4cG9ydCBkZWZhdWx0IEFwcExheW91dDtcbiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./containers/AppLayout.js\n");

/***/ })

})