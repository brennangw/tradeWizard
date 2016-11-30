//Landing page helper functions

Template.landing.onCreated(function() {
    // this.subscribe("marketData");
    console.log("Landing created");
    Session.set("blotterBoolean", false);
});

Template.landing.helpers({
    blotterShown: function () {
        return !Session.get("blotterBoolean");
    }
});

Template.landing.events({
    'click .parentTable tbody tr': function () {
        // set the blog post we'll display details and news for
        var post = this;
        Session.set('post', post.pid);
        console.log(post.pid);

        $('#parentTradeModal').modal('show');

        var pid2 = post.pid;

        Meteor.call("passParentId", pid2, function() {
            console.log("Sent the selected PID");
        });
    },

    'click #showBlotter': function (event) {
        event.preventDefault();

        console.log("Show blotter clicked");

        Session.set("blotterBoolean", true);

        // TODO Here we should :
        //         Hide the parentDataTable
        //         Show the unfiltered table
        //         Hide the showBlotter button
        //         Show the hideBlotter button

        // style="display: none;" -> this attribute hides the button

        // $('#parentTradeModal').modal('hide');
        //
        // Meteor.call("getParentId", function(error, results) {
        //     currentParentId = results;
        //     // console.log(currentParentId);
        //     // console.log("Got the selected PID");
        // });
        // console.log(currentParentId);
        //
        // Meteor.call("stopOrder", currentParentId, mode,  function(error, results) {
        //     // console.log(results);
        //     console.log(currentParentId);
        //     console.log("Cancelled a trade request");
        // });

        //display popover on success

    },

    'click #hideBlotter': function (event) {
        event.preventDefault();

        console.log("Hide blotter clicked");

        Session.set("blotterBoolean", false);

    }

});

Template.createOrderForm.helpers({
    tooltip: function () {
        $('[data-toggle="tooltip"]').tooltip();
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

