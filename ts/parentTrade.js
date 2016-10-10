var http = require('http');
var request = require("request");
var cron = require('node-cron');

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
function (ptidIn, eqIdIn, qPCTIn, sideIn, priceIn, itersIn, iIn, sIn, http) {
    this.ptid = ptidIn;
    this.equityId = eqIdIn;
    this.quantityPerChildTrade = qPCTIn;
    this.side = sideIn;
    this.price = priceIn;
    this.intervals = itersIn;
    this.interval = iIn;
    this.server = sIn;
    this.objToQuery = objToQuery;
    var that = this;
    var intervalsSoFar = 0;
    this.childTrades = cron.schedule(this.interval, function() {
        intervalsSoFar++;
        var paramsObj = {
            "id" : that.equityId,
            "side" : that.side,
            "qty" : that.quantityPerChildTrade,
            "price" : that.price
        };
        var message = that.objToQuery(paramsObj);
        var uri = that.server.host + ':' + that.server.port + that.server.path + message;
        console.log("here is request #"+ intervalsSoFar+ ": " + uri);
        var serverUrl = that.server.host + ':' + that.server.port + that.server.path;
        if (http) {
            var options = {
                url: serverUrl,
                path: paramsObj,
                method: 'GET'
            };
            var callback = function(error, response, body) {
                // console.log("here is the resonse for ct #" + intervalsSoFar + " of pt " + that.ptid);
                console.log(body);
            };
            // var req = request(options, callback);
            request(uri, callback);
            // req.write(message);
            // req.end();

        }
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