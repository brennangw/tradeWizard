import { Meteor } from 'meteor/meteor';

Replies = new Meteor.Collection("replies_from_the_exchange");
Meteor.startup(function() {

    ReactiveTable.publish("replies", Replies);
    var PORT = 8081;
    Meteor.methods({
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
                "&price=100" +
                "&interval=*/1%20*%20*%20*%20*%20*" +
                "&iters=4";
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
