
//Landing page helper functions
// Template.landing.onCreated( function () {
// });

Meteor.subscribe("replies");

Template.landing.helpers({
    replies_function : function () {
        // console.log("Calling find function");
        console.log(Replies.findOne({}));
        //return (Replies.find({},{sort: {timestamp: -1}}));
        return (Replies.find({}, {limit: 1, sort:{timestamp:-1}}).fetch());
      //  .sort({age:-1}).limit(1)
    },

    tableSettings : function () {
        return {
            rowsPerPage: 10,
            showNavigation: 'auto',
            fields: [
                { key: 'id', label: 'Parent Trade ID' },
                { key: 'qty', label: 'Quantity' },
                { key: 'side', label: 'Side (Buy/Sell)' },
                { key: 'avg_price', label: 'Average Price' },
                { key: 'timestamp', label: 'Time Stamp' },
            ]

        };
    }

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
        console.log(target.sell_button.value);

        side = "sell";
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



Template.ChildOrders.events({
    'submit .submitChildForm': function(event) {
        event.preventDefault();

        // console.log(event.type);
        // console.log("Form submitted");

        $('#childModal').modal('hide');

        var target = event.target;
        var symbol = target.etf_symbol.value;




    }
});
