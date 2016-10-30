
//Landing page helper functions
// Replies = Meteor.Collection("replies");

Template.landing.helpers({
    // replies : function () {
    //     return Replies.find({});
    // }
});

Template.landing.events({
    // 'submit form': function(event) {
    //     console.log("TEST")
    // }
});

Template.createOrderForm.events({
    'submit .submitOrderForm': function(event) {
        event.preventDefault();

        // console.log(event.type);
        // console.log("Form submitted");

        $('#createOrderModal').modal('hide');

        var target = event.target;
        var symbol = target.etf_symbol.value;
        var orderQty = target.orderQty.value;
        var strategy = target.strategy.value;
        var account = target.account.value;
        var side;

        if(target.sell_button.value) {
            side = "sell";
        }

        console.log(symbol);
        console.log(orderQty);
        console.log(strategy);
        console.log(account);
        console.log(side);

        //Call the request to the endpoint here

        Meteor.call("sendTradeRequest", symbol, orderQty, side, strategy, account, function(error, results) {
            // console.log(results.content); //results.data should be a JSON object
            console.log("Sent a trade request");
        });

    }
});
