"use strict";

System.register([], function (_export, _context) {
    "use strict";

    var _createClass, DateHelper;

    function _toConsumableArray(arr) {
        if (Array.isArray(arr)) {
            for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
                arr2[i] = arr[i];
            }

            return arr2;
        } else {
            return Array.from(arr);
        }
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    return {
        setters: [],
        execute: function () {
            _createClass = function () {
                function defineProperties(target, props) {
                    for (var i = 0; i < props.length; i++) {
                        var descriptor = props[i];
                        descriptor.enumerable = descriptor.enumerable || false;
                        descriptor.configurable = true;
                        if ("value" in descriptor) descriptor.writable = true;
                        Object.defineProperty(target, descriptor.key, descriptor);
                    }
                }

                return function (Constructor, protoProps, staticProps) {
                    if (protoProps) defineProperties(Constructor.prototype, protoProps);
                    if (staticProps) defineProperties(Constructor, staticProps);
                    return Constructor;
                };
            }();

            _export("DateHelper", DateHelper = function () {
                function DateHelper() {
                    _classCallCheck(this, DateHelper);

                    throw new Error("The DateHelper class cannot be instantiated");
                }

                _createClass(DateHelper, null, [{
                    key: "dateToText",
                    value: function dateToText(date) {
                        return date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
                    }
                }, {
                    key: "textToDate",
                    value: function textToDate(text) {

                        if (!/\d{4}-\d{2}-\d{2}/.test(text)) throw new Error("The date needs to follow this pattern: yyyy-mm-dd");

                        return new (Function.prototype.bind.apply(Date, [null].concat(_toConsumableArray(text.split("-").map(function (item, index) {
                            return item - index % 2;
                        })))))();
                    }
                }]);

                return DateHelper;
            }());

            _export("DateHelper", DateHelper);
        }
    };
});
//# sourceMappingURL=DateHelper.js.map