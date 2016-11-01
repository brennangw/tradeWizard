import { Meteor } from 'meteor/meteor';

Replies = new Meteor.Collection("replies_from_the_exchange");
Meteor.startup(function() {

    //Check if we're connected to the database
    console.log( Replies.find({}, {limit: 1, sort:{timestamp:-1}}).fetch());
    res=Replies.find({}, {limit: 1, sort:{timestamp:-1}}).fetch();
    //res = Replies.find();
    console.log(res);

    ReactiveTable.publish("replies", Replies);

    // ReactiveTable.publish("replies", res);
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
                var request = Meteor.http.call("GET", "http://localhost:" + PORT +
                    "/?id=3&" +
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
