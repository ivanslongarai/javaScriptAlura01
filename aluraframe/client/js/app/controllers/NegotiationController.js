"use strict";

System.register(["../models/NegotiationList", "../models/Message", "../views/NegotiationsView", "../views/MessageView", "../services/NegotiationService", "../helpers/DateHelper", "../helpers/Bind", "../models/Negotiation"], function (_export, _context) {
    "use strict";

    var NegotiationList, Message, NegotiationsView, MessageView, NegotiationService, DateHelper, Bind, Negotiation, _createClass, NegotiationController;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    return {
        setters: [function (_modelsNegotiationList) {
            NegotiationList = _modelsNegotiationList.NegotiationList;
        }, function (_modelsMessage) {
            Message = _modelsMessage.Message;
        }, function (_viewsNegotiationsView) {
            NegotiationsView = _viewsNegotiationsView.NegotiationsView;
        }, function (_viewsMessageView) {
            MessageView = _viewsMessageView.MessageView;
        }, function (_servicesNegotiationService) {
            NegotiationService = _servicesNegotiationService.NegotiationService;
        }, function (_helpersDateHelper) {
            DateHelper = _helpersDateHelper.DateHelper;
        }, function (_helpersBind) {
            Bind = _helpersBind.Bind;
        }, function (_modelsNegotiation) {
            Negotiation = _modelsNegotiation.Negotiation;
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

            _export("NegotiationController", NegotiationController = function () {
                function NegotiationController() {
                    _classCallCheck(this, NegotiationController);

                    var $ = document.querySelector.bind(document);
                    this._inputDate = $("#date");
                    this._inputAmount = $("#amount");
                    this._inputPrice = $("#price");
                    this._negotiationList = new Bind(new NegotiationList(), new NegotiationsView($("#negotiations-view")), 'add', 'setEmpty');
                    this._message = new Bind(new Message(), new MessageView($("#message-view")), 'text');
                    this._service = new NegotiationService();
                    this._init();
                }

                _createClass(NegotiationController, [{
                    key: "_init",
                    value: function _init() {
                        var _this = this;

                        this._service.listAll().then(function (negotiations) {
                            return negotiations.forEach(function (negotiation) {
                                return _this._negotiationList.add(negotiation);
                            });
                        }).catch(function (err) {
                            console.log(err);
                            _this._message.text = err;
                        });
                        setInterval(function () {
                            _this.importNegotiations();
                        }, 3000);
                    }
                }, {
                    key: "add",
                    value: function add(event) {
                        var _this2 = this;

                        event.preventDefault();
                        var negotiation = this._createNegotiation();
                        this._service.add(negotiation).then(function (message) {
                            _this2._negotiationList.add(negotiation);
                            _this2._message.text = message;
                            _this2._reset();
                        }).catch(function (err) {
                            return _this2._message.text = err;
                        });
                    }
                }, {
                    key: "_createNegotiation",
                    value: function _createNegotiation() {
                        return new Negotiation(DateHelper.textToDate(this._inputDate.value), parseInt(this._inputAmount.value), parseFloat(this._inputPrice.value));
                    }
                }, {
                    key: "_reset",
                    value: function _reset() {
                        this._inputDate.value = "";
                        this._inputAmount.value = 1;
                        this._inputPrice.value = 0;
                        this._inputDate.focus();
                    }
                }, {
                    key: "clearList",
                    value: function clearList() {
                        var _this3 = this;

                        this._service.clearList().then(function (message) {
                            _this3._message.text = message;
                            _this3._negotiationList.setEmpty();
                        }).catch(function (err) {
                            return _this3._message.text = err;
                        });
                    }
                }, {
                    key: "importNegotiations",
                    value: function importNegotiations() {
                        var _this4 = this;

                        this._service.importNegotiations(this._negotiationList.negotiations).then(function (negotiations) {
                            negotiations.forEach(function (negotiation) {
                                _this4._negotiationList.add(negotiation);
                                _this4._message.text = "Negociações importadas com sucesso";
                            });
                        });
                    }
                }]);

                return NegotiationController;
            }());

            _export("NegotiationController", NegotiationController);
        }
    };
});
//# sourceMappingURL=NegotiationController.js.map