import {View} from "./View";
import {DateHelper} from "../helpers/DateHelper";

export class NegotiationsView extends View{

    constructor(element){
        super(element);
    }    

    template(model) {
        return `
        
            <table class="table table-hover table-bordered">
                <thead>
                    <tr>
                        <th>Data</th>
                        <th>Quantidade</th>
                        <th>Valor</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    ${model._negotiations.map(n => `
                            <tr>
                               <td>${DateHelper.dateToText(n.date)}</td>
                               <td>${n.amount}</td>
                               <td>${n.price}</td>
                               <td>${n.total}</td>
                            </tr>
                        `).join("")};
                </tbody>
                <tfoot>
                    <td colspan="3"></td>
                    <td>${model._negotiations.reduce((total, n) => 
                            total + n.total, 0.0)}
                    <td>
                </tfoot>
            </table >`;
    }
}

