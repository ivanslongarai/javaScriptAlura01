import {NegotiationList} from "../models/NegotiationList";
import {Message} from "../models/Message";
import {NegotiationsView} from "../views/NegotiationsView";
import {MessageView} from "../views/MessageView";
import {NegotiationService} from "../services/NegotiationService";
import {DateHelper} from "../helpers/DateHelper";
import {Bind} from "../helpers/Bind";
import {Negotiation} from "../models/Negotiation";

export class NegotiationController {

    constructor() {
        const $ = document.querySelector.bind(document);
        this._inputDate = $("#date");
        this._inputAmount = $("#amount");
        this._inputPrice = $("#price");
        this._negotiationList = new Bind(new NegotiationList(), new NegotiationsView($("#negotiations-view")), 'add', 'setEmpty');
        this._message = new Bind(new Message(), new MessageView($("#message-view")), 'text');
        this._service = new NegotiationService();
        this._init();
    }

    _init() {
        this._service
            .listAll()
            .then(negotiations =>
                negotiations.forEach(negotiation =>
                    this._negotiationList.add(negotiation)))
            .catch(err => {
                console.log(err);
                this._message.text = err;
            });
        setInterval(() => {
            this.importNegotiations();
        }, 3000);
    };

    add(event) {
        event.preventDefault();
        let negotiation = this._createNegotiation();
        this._service
            .add(negotiation)
            .then(message => {
                this._negotiationList.add(negotiation);
                this._message.text = message;
                this._reset();
            }).catch(err => this._message.text = err);
    };

    _createNegotiation() {
        return new Negotiation(
            DateHelper.textToDate(this._inputDate.value),
            parseInt(this._inputAmount.value),
            parseFloat(this._inputPrice.value),
        );
    }

    _reset() {
        this._inputDate.value = "";
        this._inputAmount.value = 1;
        this._inputPrice.value = 0;
        this._inputDate.focus();
    }

    clearList() {
        this._service
            .clearList()
            .then(message => {
                this._message.text = message;
                this._negotiationList.setEmpty()
            })
            .catch(err => this._message.text = err);
    }

    importNegotiations() {
        this._service
            .importNegotiations(this._negotiationList.negotiations)
            .then(negotiations => {
                negotiations.forEach(negotiation => {
                    this._negotiationList.add(negotiation);
                    this._message.text = "Negociações importadas com sucesso";
                })
            });
    }
}