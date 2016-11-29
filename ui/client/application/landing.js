// import { Replies } from '../../lib/collections/repliesCollection.js';

//Landing page helper functions

// Template.landing.onCreated( function () {
//     var self = this;
//     self.autorun(function () {
//         self.subscribe('replies');
//     });
// });

Template.landing.helpers({

});

Template.landing.events({
    'click .parentTable tbody tr': function () {
        // set the blog post we'll display details and news for
        var post = this;
        Session.set('post', post);
        console.log(post.parentTradeId);

        $('#parentTradeModal').modal('show');

        var pid = post.parentTradeId;

        Meteor.call("passParentId", pid, function() {
            console.log("Sent the selected PID");
        });
    }
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

        if (strategy == "Time-Weighted Average Price (TWAP)") {
            strategy='twap';
        }
        if (strategy == "Immediate Sale") {
            strategy='immediate';
        }
        //Call the request to the endpoint here

        Meteor.call("sendTradeRequest", symbol, orderQty, side, strategy, account, function() {
            // console.log(results.content); //results.data should be a JSON object
            console.log("Sent a trade request");
        });

    }
});

