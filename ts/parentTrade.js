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
function (ptidIn, eqIdIn, qPCTIn, sideIn, priceIn, itersIn, iIn, sIn, dbIn, http) {
    this.ptid = ptidIn;
    this.equityId = eqIdIn;
    this.quantityPerChildTrade = qPCTIn;
    this.side = sideIn;
    this.price = priceIn;
    this.intervals = itersIn;
    this.interval = iIn;
    this.server = sIn;
    this.objToQuery = objToQuery;
    this.replies = dbIn.replies;
    this.sent = dbIn.sent;
    var that = this;
    var intervalsSoFar = 0;
    //may need to do one trade immediatly if there is not an option
    //to run this right away.
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
        console.log("sending request #"+ intervalsSoFar+ ": " + uri);
        var serverUrl = that.server.host + ':' + that.server.port + that.server.path;
        if (http) {
            var options = {
                url: serverUrl,
                path: paramsObj,
                method: 'GET'
            };
            var callback = function(error, response, body) {
                console.log("response for ct #" + intervalsSoFar + " of pt " + that.ptid);
                var bodyObj = JSON.parse(body);
                bodyObj.time = Date.now();
                paramsObj.parentTrade = that.ptid;
                paramsObj.childTrade = intervalsSoFar;

                that.replies.save(bodyObj, function(err, doc) {
                    if (err) {
                        console.log("replies callback error below then doc");
                        console.log(err);
                        console.log(doc);
                    }
                });
            };
            paramsObj.time = Date.now();
            paramsObj.parentTrade = that.ptid;
            paramsObj.childTrade = intervalsSoFar;
            that.sent.save(paramsObj, function(err, doc) {
                if (err) {
                    console.log("replies callback error below then doc");
                    console.log(err);
                    console.log(doc);
                }
            });
            request(uri, callback);
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