var http = require('http');
var cron = require('node-cron');
var ChildTrade = require('./childTrade.js');


var TwapParentTrade =
    function (id, eqId, qty, side, exchange, db, currentTime) {
        //direct parameter assignment
        this.id = id;
        this.equityId = eqId;
        this.side = side;
        this.qty = qty;
        this.exchange = exchange;
        this.db = db;

        //other assignment based on parameters
        this.qtyLeft = this.qty;
        this.price = "0";
        if (this.side == "buy") {
            this.price = "2147483647"; //max 32 bit int
        }

        //other assignments
        this.endTime = Date("2016-10-28 00:30:00"); //in ms
        this.totalIntervals = 10;
        this.intervalsSoFar = 0;
        this.childTrades = [];

        var that = this;
        request((this.location + '/query?id=1'), function (err, res, body) {
            try {
                var bodyAsJson = JSON.parse(body);
            } catch (e) {
                return console.error(e);
            }
            var currentTime = Date(bodyAsJson.timestamp); //in ms
            this.intervalLength = Math.floor((that.endTime -
                currentTime)/that.totalIntervals); //in ms

            //first trade
            this.makeTrade();

            //set up other trades
            this.tradeTimer = setInterval(function(pt) {
                if (pt.intervalsSoFar >= pt.intervals) {
                    pt.stop();
                }
                pt.makeTrade();
            }, that.intervalLength, that);
        });
    };

    TwapParentTrade.prototype.intervalsRemaining = function () {
        this.totalIntervals - this.intervalsSoFar;
    };

    TwapParentTrade.prototype.stop = function () {
        clearInterval(this.tradeTimer);
    };

    TwapParentTrade.prototype = function () {
        //flexible so if a trade doesn't work TWAP can still be used.
        var qtyToTrade = Math.ceiling(that.qtyLeft/this.intervalsRemaining());
        var currentChildTrade = new ChildTrade(this.intervalsSoFar,
            qtyToTrade, that);
        this.intervalsSoFar++;
        this.exchange.submitTrade(currentChildTrade, this.db);
    }

module.exports = ParentTrade;