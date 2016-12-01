var request = require("request");

var Exchange = function (exchangeLocation) {
    this.location = exchangeLocation;
};

Exchange.prototype.submitTrade = function (childTrade, db) {
    childTrade.beforeSending();
    console.log(this.location + "/order" + childTrade.toQuery());
    request((this.location + "/order" + childTrade.toQuery()), childTrade.afterSending);
};

Exchange.prototype.getTime = function () {
    request((this.location + "/query?id=1"));
};

module.exports = Exchange;
