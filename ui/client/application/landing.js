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

var side;

Template.createOrderForm.events({
    'click #buyButton' : function () {
        var temp = $('#buyButton').val();
        if (temp == "BUY") {
            side = "buy";
        }
    },

    'click #sellButton' : function () {
        var temp = $('#sellButton').val();
        if (temp == "SELL") {
            side = "sell";
        }
    },

    'submit .submitOrderForm': function(event) {
        event.preventDefault();

        $('#createOrderModal').modal('hide');

        var target = event.target;
        var symbol = target.etf_symbol.value;
        var orderQty = target.orderQty.value;
        var strategy = target.strategy.value;
        var account = target.account.value;

        console.log(target);
        console.log(target.value);

        var email = Meteor.user().emails[0].address;

        console.log(email);
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

        Meteor.call("sendTradeRequest", symbol, orderQty, side, strategy, account, email, function() {
            console.log("Sent a trade request");
        });

    }
});

