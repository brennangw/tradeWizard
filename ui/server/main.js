import { Meteor } from 'meteor/meteor';

// Replies = new Meteor.Collection("replies_from_the_exchange");

var globalParentId;

Meteor.startup(function() {

    // ReactiveTable.publish("replies", Replies);

    // Meteor.publish('replies', function () {
    //     return Replies.find();
    // });

    var PORT = 8081;
    Meteor.methods({
        passParentId: function(parentId) {
          this.unblock();
          globalParentId = parentId;
        },

        getParentId: function() {
            this.unblock();
            return globalParentId;
        },

        stopOrder: function(parentId, mode) {
            this.unblock();
            console.log("Stopping order: ");
            console.log(parentId);

            try {
                request_string = "http://localhost:" + PORT +
                    "/?pid=" + parentId +
                    "&" +
                    "mode=" + mode;
                var request = Meteor.http.call("GET", request_string);
                console.log(request_string);
                console.log(request);
            }
            catch(err){
                console.log(err.message);
            }
            console.log("Made it to the end of the call");
        },

        changeOrderType: function(parentId, mode) {
            this.unblock();
            console.log("Stopping order: ");
            console.log(parentId);

            mode = "twapToImmediate";

            try {
                request_string = "http://localhost:" + PORT +
                    "/?pid=" + parentId +
                    "&" +
                    "mode=" + mode;
                var request = Meteor.http.call("GET", request_string);
                console.log(request_string);
                console.log(request);
            }
            catch(err){
                console.log(err.message);
            }
        },

        sendTradeRequest: function(etfSymbol, orderQty, side, tradeStrategy, accountNumber) {
            this.unblock();
            console.log("Sending request to node server. Parameters:");
            console.log(etfSymbol);
            console.log(orderQty);
            console.log(side);
            console.log(tradeStrategy);
            console.log(accountNumber);

        try {
            request_string = "http://localhost:" + PORT +
                "/?id=3&" +
                "qty=" + orderQty +
                "&side=" + side +
                "&mode=" + tradeStrategy;
            var request = Meteor.http.call("GET", request_string);
            console.log(request_string);
            console.log(request);

            }
            catch(err){
                console.log(err.message);
            }
            // return request;
            console.log("Made it to the end of the call");
        }
    });
});
