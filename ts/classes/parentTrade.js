var http = require('http');
var cron = require('node-cron');
var ChildTrade = require('./childTrade.js');


var ParentTrade = 
function (id, eqId, qty, side, price, intervals, interval, exchange, db) {
    this.id = id;
    this.equityId = eqId;
    this.qty = qty;
    this.side = side;
    this.price = price;
    this.intervals = intervals;
    this.interval = interval;
    this.exchange = exchange;
    this.db = db;
    this.intervalsSoFar = 0;
    var that = this;

    //todo: may need to do one trade if there is not an option to run this right away.

    //todo: use a scheduler to divide up the trade

    // this.childTradeSchedule = cron.schedule(this.interval, function() {
    //     that.intervalsSoFar++;
    //
    //     var currentChildTrade = new ChildTrade(that.intervalsSoFar, that.equityId,
    //         that.side, that.qty, that.price, that.id, that.db);
    //     that.exchange.submitTrade(currentChildTrade, that.db);
    //     console.log("sending child trade id# "+ currentChildTrade.id);
    //
    //     if (that.intervalsSoFar >= that.intervals) {
    //         that.stop();
    //     }
    // });

    this.start = function start () {
        console.log('started parent trade');
        // this.childTradeSchedule.start();
        //todo: use a scheduler to divide up the trade.
        var currentChildTrade = new ChildTrade(0, that.equityId,
            that.side, that.qty, that.price, that.id, that.db);
        that.exchange.submitTrade(currentChildTrade, that.db);
    };

    this.stop = function () {
        console.log('parent trade finished');
        this.childTradeSechdule.stop();
    };
};
module.exports = ParentTrade;