"use strict";

System.register(["./HttpService", "./ConnectionFactory", "../dao/NegotiationDAO", "../models/Negotiation"], function (_export, _context) {
    "use strict";

    var HttpService, ConnectionFactory, NegotiationDAO, Negotiation, _createClass, NegotiationService;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    return {
        setters: [function (_HttpService) {
            HttpService = _HttpService.HttpService;
        }, function (_ConnectionFactory) {
            ConnectionFactory = _ConnectionFactory.ConnectionFactory;
        }, function (_daoNegotiationDAO) {
            NegotiationDAO = _daoNegotiationDAO.NegotiationDAO;
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

            _export("NegotiationService", NegotiationService = function () {
                function NegotiationService() {
                    _classCallCheck(this, NegotiationService);

                    this._http = new HttpService();
                }

                _createClass(NegotiationService, [{
                    key: "getWeekNegotiations",
                    value: function getWeekNegotiations() {
                        var _this = this;

                        return new Promise(function (resolve, reject) {
                            _this._http.get("http://localhost:3000/negotiations/week").then(function (negotiations) {
                                resolve(negotiations.map(function (object) {
                                    return new Negotiation(new Date(object.date), object.amount, object.price);
                                }));
                            }).catch(function (err) {
                                console.log(err);
                                reject("Não foi possível obter as negociações da semana.");
                            });
                        });
                    }
                }, {
                    key: "getPreviousNegotiations",
                    value: function getPreviousNegotiations() {
                        var _this2 = this;

                        return new Promise(function (resolve, reject) {
                            _this2._http.get("http://localhost:3000/negotiations/previous").then(function (negotiations) {
                                resolve(negotiations.map(function (object) {
                                    return new Negotiation(new Date(object.date), object.amount, object.price);
                                }));
                            }).catch(function (err) {
                                console.log(err);
                                reject("Não foi possível obter as negociações da semana anterior.");
                            });
                        });
                    }
                }, {
                    key: "getDelayedNegotiations",
                    value: function getDelayedNegotiations() {
                        var _this3 = this;

                        return new Promise(function (resolve, reject) {
                            _this3._http.get("http://localhost:3000/negotiations/delayed").then(function (negotiations) {
                                resolve(negotiations.map(function (object) {
                                    return new Negotiation(new Date(object.date), object.amount, object.price);
                                }));
                            }).catch(function (err) {
                                console.log(err);
                                reject("Não foi possível obter as negociações da semana retrasada.");
                            });
                        });
                    }
                }, {
                    key: "add",
                    value: function add(negotiation) {
                        return ConnectionFactory.getConnection().then(function (connection) {
                            return new NegotiationDAO(connection);
                        }).then(function (dao) {
                            return dao.add(negotiation);
                        }).then(function () {
                            return "Negociação incluída com sucesso";
                        }).catch(function (err) {
                            console.log(err);
                            throw new Error("Não foi possível inserir a negociação.");
                        });
                    }
                }, {
                    key: "listAll",
                    value: function listAll() {
                        return ConnectionFactory.getConnection().then(function (connection) {
                            return new NegotiationDAO(connection);
                        }).then(function (dao) {
                            return dao.listAll();
                        }).catch(function (err) {
                            console.log(err);
                            throw new Error("Não foi possível obter as negociações");
                        });
                    }
                }, {
                    key: "clearList",
                    value: function clearList() {
                        return ConnectionFactory.getConnection().then(function (connection) {
                            return new NegotiationDAO(connection);
                        }).then(function (dao) {
                            return dao.clearList();
                        }).then(function () {
                            return "Negociações excluídas com sucesso.";
                        }).catch(function (err) {
                            console.log(err);
                            throw new Error("Não foi possível excluir a lista de negociações");
                        });
                    }
                }, {
                    key: "getNegotiations",
                    value: function getNegotiations() {
                        return Promise.all([this.getWeekNegotiations(), this.getPreviousNegotiations(), this.getDelayedNegotiations()]).then(function (times) {
                            var negotiations = times.reduce(function (records, periodo) {
                                return records.concat(periodo);
                            }, []).map(function (record) {
                                return new Negotiation(new Date(record.date), record.amount, record.price);
                            });
                            return negotiations;
                        }).catch(function (err) {
                            throw new Error(err);
                        });
                    }
                }, {
                    key: "importNegotiations",
                    value: function importNegotiations(actualNegotiations) {
                        return this.getNegotiations().then(function (negotiations) {
                            return negotiations.filter(function (negotiation) {
                                return !actualNegotiations.some(function (negotiationSome) {
                                    return JSON.stringify(negotiation) == JSON.stringify(negotiationSome);
                                });
                            });
                        }).catch(function (err) {
                            console.log(err);
                            throw new Error("Não foi possível importar as negociações");
                        });
                    }
                }]);

                return NegotiationService;
            }());

            _export("NegotiationService", NegotiationService);
        }
    };
});
//# sourceMappingURL=NegotiationService.js.map