"use strict";

System.register(["./View", "../helpers/DateHelper"], function (_export, _context) {
    "use strict";

    var View, DateHelper, _createClass, NegotiationsView;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    function _possibleConstructorReturn(self, call) {
        if (!self) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }

        return call && (typeof call === "object" || typeof call === "function") ? call : self;
    }

    function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
        }

        subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
                value: subClass,
                enumerable: false,
                writable: true,
                configurable: true
            }
        });
        if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    }

    return {
        setters: [function (_View2) {
            View = _View2.View;
        }, function (_helpersDateHelper) {
            DateHelper = _helpersDateHelper.DateHelper;
        }],
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

            _export("NegotiationsView", NegotiationsView = function (_View) {
                _inherits(NegotiationsView, _View);

                function NegotiationsView(element) {
                    _classCallCheck(this, NegotiationsView);

                    return _possibleConstructorReturn(this, (NegotiationsView.__proto__ || Object.getPrototypeOf(NegotiationsView)).call(this, element));
                }

                _createClass(NegotiationsView, [{
                    key: "template",
                    value: function template(model) {
                        return "\n        \n            <table class=\"table table-hover table-bordered\">\n                <thead>\n                    <tr>\n                        <th>Data</th>\n                        <th>Quantidade</th>\n                        <th>Valor</th>\n                        <th>Total</th>\n                    </tr>\n                </thead>\n                <tbody>\n                    " + model._negotiations.map(function (n) {
                            return "\n                            <tr>\n                               <td>" + DateHelper.dateToText(n.date) + "</td>\n                               <td>" + n.amount + "</td>\n                               <td>" + n.price + "</td>\n                               <td>" + n.total + "</td>\n                            </tr>\n                        ";
                        }).join("") + ";\n                </tbody>\n                <tfoot>\n                    <td colspan=\"3\"></td>\n                    <td>" + model._negotiations.reduce(function (total, n) {
                            return total + n.total;
                        }, 0.0) + "\n                    <td>\n                </tfoot>\n            </table >";
                    }
                }]);

                return NegotiationsView;
            }(View));

            _export("NegotiationsView", NegotiationsView);
        }
    };
});
//# sourceMappingURL=NegotiationsView.js.map