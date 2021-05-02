const stores = ["negotiations"];
const version = 5;
const db = "aluraframe";
let connection = null;
let close = null;
export class ConnectionFactory {
    constructor() {
        throw new Errror("It's not possible to create instances of ConnectionFactory.");
    }
    static getConnection() {
        return new Promise((resolve, reject) => {
            const openRequest = window.indexedDB.open(db, version);
            openRequest.onupgradeneeded = e => {
                ConnectionFactory._createStores(e.target.result);
            };
            openRequest.onsuccess = e => {
                if (!connection) {
                    connection = e.target.result;
                    close = connection.close.bind(connection);
                    connection.close = function () {
                        throw new Error("It's not possible to close the connection by using this method");
                    }
                }
                resolve(connection);
            };
            openRequest.onerror = e => {
                console.log(e.target.error);
                reject(e.target.error.name);
            };
        });
    }
    static _createStores(connection) {
        stores.forEach(store => {
            if (connection.objectStoreNames.contains(store))
                connection.deleteObjectStore(store);
            connection.createObjectStore(store, { autoIncrement: true });
        })
    }
    static closeConnection() {
        connection.close = close;
        if (connection)
            close();
        connection = null;
    }
}
