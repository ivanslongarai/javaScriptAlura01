"use strict";

System.register(["../models/Negotiation"], function (_export, _context) {
    "use strict";

    var Negotiation, _createClass, NegotiationDAO;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    return {
        setters: [function (_modelsNegotiation) {
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

            _export("NegotiationDAO", NegotiationDAO = function () {
                function NegotiationDAO(connection) {
                    _classCallCheck(this, NegotiationDAO);

                    this._connection = connection;
                    this._store = "negotiations";
                }

                _createClass(NegotiationDAO, [{
                    key: "add",
                    value: function add(negotiation) {
                        var _this = this;

                        return new Promise(function (resolve, reject) {

                            var request = _this._connection.transaction([_this._store], "readwrite").objectStore(_this._store).add(negotiation);

                            request.onsuccess = function (e) {
                                resolve();
                            };
                            request.onerror = function (e) {
                                console.log(e.target.error);
                                reject("Não foi possível adicionar a negociação");
                            };
                        });
                    }
                }, {
                    key: "listAll",
                    value: function listAll() {
                        var _this2 = this;

                        return new Promise(function (resolve, reject) {
                            var cursor = _this2._connection.transaction([_this2._store], "readwrite").objectStore(_this2._store).openCursor();

                            var negotiations = [];

                            cursor.onsuccess = function (e) {
                                var actual = e.target.result;
                                if (actual) {
                                    var record = actual.value;
                                    negotiations.push(new Negotiation(new Date(record._date), record._amount, record._price));
                                    actual.continue();
                                } else {
                                    resolve(negotiations);
                                }
                            };

                            cursor.onerror = function (e) {
                                console.log(e.target.error);
                                reject("Não foi possível listar as negociações.");
                            };
                        });
                    }
                }, {
                    key: "clearList",
                    value: function clearList() {
                        var _this3 = this;

                        return new Promise(function (resolve, reject) {
                            var request = _this3._connection.transaction([_this3._store], "readwrite").objectStore(_this3._store).clear();
                            request.onsuccess = function (e) {
                                return resolve("Negociações excluídas com sucesso.");
                            };
                            request.onerror = function (e) {
                                console.log(e.target.error);
                                reject("Não foi possível excluir as negociações.");
                            };
                        });
                    }
                }]);

                return NegotiationDAO;
            }());

            _export("NegotiationDAO", NegotiationDAO);
        }
    };
});
//# sourceMappingURL=NegotiationDAO.js.map