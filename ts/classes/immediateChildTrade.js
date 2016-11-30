var moment = require('moment-timezone');

var immediateChildTrade = function (id, equityId, uid, side, qty, price, parentTradeId, db) {
    this.id = id;
    this.equityId = equityId;
    this.uid = uid;
    this.side = side;
    this.qty = qty;
    this.price = price;
    this.parentTradeId = parentTradeId;
    this.db = db;
    //todo: may not need to do the that = this
    var that = this;
    this.afterSending = function(error, response, body) {
        console.log("response for child trade id#" + that.id +
            " of pt id#" + that.parentTradeId);
        console.log(body);
        try {
            var bodyAsJson = JSON.parse(body);
        } catch (e) {
            return console.error(e);
        }

        var response = Object.assign({
            readable_time : moment().tz("America/New_York").format("YYYY-MM-DD HH:mm z"),
            time : Date.now(),
            parentTradeId : that.parentTradeId,
            status : ((bodyAsJson.qty === 0) ? "FAILURE" : "SUCCESS"), //todo: remove this tmp fix for UI
            uid : that.uid,
            childTrade : that.id
        }, bodyAsJson);
        that.db.replies.save(response, function(err, doc) {
            if (err) {
                console.log("replies save callback error");
                console.log(err);
                console.log(doc);
            }
        });
    };

};


immediateChildTrade.prototype.beforeSending = function () {
    var toSave = {
        parentTradeId : this.parentTradeId,
        childTradeId : this.id,
        uid : this.uid,
        equityId : this.equityId,
        price : this.price,
        qty : this.qty,
        side : this.side,
        dateSubmitted : Date.now()
    };
    this.db.sent.save(toSave, function(err, doc) {
        if (err) {
            console.log("replies callback error below then doc");
            console.log(err);
            console.log(doc);
        }
    });
};

immediateChildTrade.prototype.toQuery = function () {
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
    return objToQuery({
        id : this.equityId,
        price : this.price,
        qty : this.qty,
        side : this.side });
};

module.exports = immediateChildTrade;