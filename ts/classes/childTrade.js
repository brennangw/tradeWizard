var ChildTrade = function (id, equityId, side, qty, price, parentTradeId, db) {
    this.id = id;
    this.equityId = equityId;
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
        var response = Object.assign({time : Date.now()}, JSON.parse(body));
        that.db.replies.save(response, function(err, doc) {
            if (err) {
                console.log("replies save callback error");
                console.log(err);
                console.log(doc);
            }
        });
    };

};


ChildTrade.prototype.beforeSending = function () {
    var toSave = {
        parentTradeId : this.parentTradeId,
        childTradeId : this.id,
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

ChildTrade.prototype.toQuery = function () {
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

module.exports = ChildTrade;