import {currentInstance} from "./controllers/NegotiationController";
import {} from "./polyfill/fetch";
let negotiationControler = new currentInstance();
document.querySelector(".form").onsubmit = negotiationControler.add.bind(negotiationControler);
document.querySelector("#btn-clear-list").onclick = negotiationControler.clearList.bind(negotiationControler);
