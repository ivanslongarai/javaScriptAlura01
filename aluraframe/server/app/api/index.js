/*Simple code, just to give a service to the application*/
const api = {}

const actualDate = new Date();
const previousDate = new Date();
previousDate.setDate(actualDate.getDate() - 7);
const delayedDate = new Date();
delayedDate.setDate(actualDate.getDate() - 14);

const negotiations = [
    { date: actualDate, amount: 1, price: 150 },
    { date: actualDate, amount: 2, price: 250 },
    { date: actualDate, amount: 3, price: 350 },
    { date: previousDate, amount: 1, price: 450 },
    { date: previousDate, amount: 2, price: 550 },
    { date: previousDate, amount: 3, price: 650 },
    { date: delayedDate, amount: 1, price: 750 },
    { date: delayedDate, amount: 2, price: 950 },
    { date: delayedDate, amount: 3, price: 950 }
];

api.listWeek = function (req, res) {
    const actualNegotiations = negotiations.filter(function (negotiation) {
        return negotiation.date > previousDate;
    });
    res.json(actualNegotiations);
};

api.listPrevious = function (req, res) {

    const previousNegotiations = negotiations.filter(function (negotiation) {
        return negotiation.date < actualDate && negotiation.date > delayedDate;
    });
    setTimeout(function () {
        res.json(previousNegotiations);
    }, 500);

};

api.listDelayed = function (req, res) {

    const delayedNegotiations = negotiations.filter(function (negotiation) {
        return negotiation.date < previousDate;
    });
    res.json(delayedNegotiations);

};

api.insertNegotiation = function (req, res) {

    console.log(req.body);
    req.body.date = new Date(req.body.date.replace(/-/g, '/'));
    negotiations.push(req.body);
    res.status(200).json("Negociação recebida");
};

module.exports = api;