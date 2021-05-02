import {HttpService} from "./HttpService";
import {ConnectionFactory} from "./ConnectionFactory";
import {NegotiationDAO} from "../dao/NegotiationDAO";
import {Negotiation} from "../models/Negotiation";

export class NegotiationService {

    constructor() {
        this._http = new HttpService();
    }

    getWeekNegotiations() {
        return new Promise((resolve, reject) => {
            this._http.get("http://localhost:3000/negotiations/week")
                .then(negotiations => {
                    resolve(negotiations.map(object => new Negotiation(new Date(object.date), object.amount, object.price)))
                })
                .catch(err => {
                    console.log(err);
                    reject("Não foi possível obter as negociações da semana.");
                });
        });
    }

    getPreviousNegotiations() {
        return new Promise((resolve, reject) => {
            this._http.get("http://localhost:3000/negotiations/previous")
                .then(negotiations => {
                    resolve(negotiations.map(object => new Negotiation(new Date(object.date), object.amount, object.price)))
                })
                .catch(err => {
                    console.log(err);
                    reject("Não foi possível obter as negociações da semana anterior.");
                });
        });
    }

    getDelayedNegotiations() {
        return new Promise((resolve, reject) => {
            this._http.get("http://localhost:3000/negotiations/delayed")
                .then(negotiations => {
                    resolve(negotiations.map(object => new Negotiation(new Date(object.date), object.amount, object.price)))
                })
                .catch(err => {
                    console.log(err);
                    reject("Não foi possível obter as negociações da semana retrasada.");
                });
        });
    }

    add(negotiation) {
        return ConnectionFactory.getConnection()
            .then(connection => new NegotiationDAO(connection))
            .then(dao => dao.add(negotiation))
            .then(() => "Negociação incluída com sucesso")
            .catch(err => {
                console.log(err);
                throw new Error("Não foi possível inserir a negociação.");
            })
    }

    listAll() {
        return ConnectionFactory
            .getConnection()
            .then(connection => new NegotiationDAO(connection))
            .then(dao => dao.listAll())
            .catch(err => {
                console.log(err);
                throw new Error("Não foi possível obter as negociações");
            });
    }

    clearList() {
        return ConnectionFactory
            .getConnection()
            .then(connection => new NegotiationDAO(connection))
            .then(dao => dao.clearList())
            .then(() => "Negociações excluídas com sucesso.")
            .catch(err => {
                console.log(err);
                throw new Error("Não foi possível excluir a lista de negociações");
            });
    }

    getNegotiations() {
        return Promise.all([
            this.getWeekNegotiations(),
            this.getPreviousNegotiations(),
            this.getDelayedNegotiations()
        ]).then(times => {
            let negotiations = times
                .reduce((records, periodo) => records.concat(periodo), [])
                .map(record => new Negotiation(new Date(record.date), record.amount, record.price));
            return negotiations;
        }).catch(err => {
            throw new Error(err);
        });
    }

    importNegotiations(actualNegotiations) {
        return this.getNegotiations()
            .then(negotiations =>
                negotiations.filter(negotiation =>
                    !actualNegotiations.some(negotiationSome =>
                        JSON.stringify(negotiation) == JSON.stringify(negotiationSome))))
            .catch(err => {
                console.log(err);
                throw new Error("Não foi possível importar as negociações");
            })
    }

}