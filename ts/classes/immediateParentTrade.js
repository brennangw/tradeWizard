var moment = require("moment-timezone");
var immediateChildTrade = require("./immediateChildTrade.js");

var ImmediateParentTrade =
    function (id, uid, eqId, qty, side, exchange, db, mailer) {
        this.id = id;
        this.uid = uid;
        this.equityId = eqId;
        this.qty = qty;
        this.side = side;
        this.price = "0";
        if (this.side == "buy") {
            this.price = "2147483647"; //max 32 bit int
        }
        this.exchange = exchange;
        this.mailer = mailer;
        this.db = db;
        var that = this;


        var toSave = {
            uid : this.uid,
            pid : this.id,
            equityId : this.equityId,
            side : this.side,
            qty : this.qty,
            time : moment().tz("America/New_York").format("YYYY-MM-DD HH:mm z")
        };

        that.db.parents.save (toSave, function (err, doc) {
            if (err) {
                console.log("parent not saved");
                console.log(err);
                console.log(doc);
            }
        });

            console.log("started parent trade");
            var currentChildTrade = new immediateChildTrade(0, that.equityId,
                that.uid, that.side, that.qty, that.price, that.id, that.db, that);
            that.exchange.submitTrade(currentChildTrade, that.db);

        this.stop = function () {
            return "Cannot stop an immediate trade.";
        };
    };
module.exports = ImmediateParentTrade;
