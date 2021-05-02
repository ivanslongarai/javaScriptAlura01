import {Negotiation} from "../models/Negotiation";

export class NegotiationDAO {

    constructor(connection) {
        this._connection = connection;
        this._store = "negotiations";
    }

    add(negotiation) {
        return new Promise((resolve, reject) => {

            const request = this._connection.transaction([this._store], "readwrite")
                .objectStore(this._store)
                .add(negotiation);

            request.onsuccess = e => {
                resolve();
            }
            request.onerror = e => {
                console.log(e.target.error);
                reject("Não foi possível adicionar a negociação");
            }
        })
    }

    listAll() {
        return new Promise((resolve, reject) => {
            let cursor = this._connection
                .transaction([this._store], "readwrite")
                .objectStore(this._store)
                .openCursor();

            let negotiations = [];

            cursor.onsuccess = e => {
                let actual = e.target.result;
                if (actual) {
                    let record = actual.value;
                    negotiations.push(new Negotiation(new Date(record._date), record._amount, record._price));
                    actual.continue();
                } else {
                    resolve(negotiations);
                }
            }

            cursor.onerror = e => {
                console.log(e.target.error);
                reject("Não foi possível listar as negociações.")
            }
        })
    }

    clearList(){
        return new Promise((resolve, reject) => {
            let request = this._connection
            .transaction([this._store], "readwrite")
            .objectStore(this._store)
            .clear();
            request.onsuccess = e => resolve("Negociações excluídas com sucesso.");
            request.onerror = e => {
                console.log(e.target.error);
                reject("Não foi possível excluir as negociações.")
            };
        })
    }
}