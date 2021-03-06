"use strict";

System.register([], function (_export, _context) {
    "use strict";

    var _createClass, Negotiation;

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

            _export("Negotiation", Negotiation = function () {
                function Negotiation(date, amount, price) {
                    _classCallCheck(this, Negotiation);

                    this._date = new Date(date.getTime());
                    this._amount = amount;
                    this._price = price;
                    Object.freeze(this);
                }

                _createClass(Negotiation, [{
                    key: "total",
                    get: function get() {
                        return this._amount * this._price;
                    }
                }, {
                    key: "date",
                    get: function get() {
                        return new Date(this._date.getTime());
                    }
                }, {
                    key: "amount",
                    get: function get() {
                        return this._amount;
                    }
                }, {
                    key: "price",
                    get: function get() {
                        return this._price;
                    }
                }]);

                return Negotiation;
            }());

            _export("Negotiation", Negotiation);
        }
    };
});
//# sourceMappingURL=Negotiation.js.map