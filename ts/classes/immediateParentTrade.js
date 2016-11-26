var immediateChildTrade = require('./immediateChildTrade.js');

var ImmediateParentTrade =
    function (id, eqId, qty, side, exchange, db) {
        this.id = id;
        this.equityId = eqId;
        this.qty = qty;
        this.side = side;
        this.price = "0";
        if (this.side == "buy") {
            this.price = "2147483647"; //max 32 bit int
        }
        this.exchange = exchange;
        this.db = db;
        var that = this;

        this.start = function start () {
            console.log('started parent trade');
            var currentChildTrade = new immediateChildTrade(0, that.equityId,
                that.side, that.qty, that.price, that.id, that.db);
            that.exchange.submitTrade(currentChildTrade, that.db);
        };

        this.stop = function () {
            return "Cannot stop an immediate trade."
        };
    };
module.exports = ImmediateParentTrade;