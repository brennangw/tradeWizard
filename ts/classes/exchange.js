var request = require("request");

var Exchange = function (exchangeLocation) {
    this.location = exchangeLocation;
};

Exchange.prototype.submitTrade = function (childTrade, db) {
    childTrade.beforeSending();
    console.log(this.location + '/order' + childTrade.toQuery());
    request((this.location + '/order' + childTrade.toQuery()) , childTrade.afterSending);
};

module.exports = Exchange;