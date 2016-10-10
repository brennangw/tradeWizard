function objToParams (obj) {
    var params = "";
    for (var k in obj) {
        if (params != "") {
            params += "&"
        }
        params += k + "=" + encodeURIComponent(obj[k]);
    }
    return params;
}

function objToQuery (obj) {
    return "?" + objToParams(obj);
}

var ParentTrade = 
function (eqIdIn, qPCTIn, sideIn, priceIn, iIn, itersIn, sOLIn) {
    var cron = require('node-cron');
    this.equityId = eqIdIn;
    this.quantityPerChildTrade = qPCTIn;
    this.side = sideIn;
    this.price = priceIn;
    this.interval = iIn;
    this.intervals = itersIn;
    this.serverOrderLocation = sOLIn;
    this.objToQuery = objToQuery;
    var that = this;
    var intervalsSoFar = 0;
    console.log(that);
    this.childTrades = cron.schedule(this.interval, function() {
        //https://trade-wizard-brennangw.c9users.io/?id=3&qty=300&side=sell&price=100&interval=*/1 * * * * *&iters=4
        intervalsSoFar++;
        var paramsObj = {
            "id" : that.equityId,
            "side" : that.side,
            "qty" : that.quantityPerChildTrade,
            "price" : that.price
        };
        var queryString = that.objToQuery(paramsObj);
        var request = that.serverOrderLocation + queryString;
        console.log("here is request #"+intervalsSoFar+": " + request);
        if (intervalsSoFar >= that.intervals) {
            that.stop();
        }
    });
    this.start = function start () {
        console.log('started parent trade');
        this.childTrades.start();
    }
    this.stop = function () {
        console.log('parent trade finished');
        this.childTrades.stop();
    }
}

module.exports = ParentTrade;