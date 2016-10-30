import { Meteor } from 'meteor/meteor';

Meteor.startup(function() {
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
            var request = Meteor.http.call("GET", "http://localhost:8081/?id=3&" +
                "qty=" + orderQty +
                "&side=" + side +
                "&price=100" +
                "&interval=*/1%20*%20*%20*%20*%20*" +
                "&iters=4");

        }
        catch(err){
            console.log(err.message);
        }
        // return request;
        console.log("Made it to the end of the call");
    }
    });
});
