/**
 * Created by ishanguru on 11/28/16.
 */

import { Replies } from '../../../lib/collections/repliesCollection.js';

Template.childDataTable.helpers({
    modal_function : function () {
        return Replies.find({parentTradeId:111}).fetch();
    }
});

Template.parentTradeModalTemplate.events({

    'click #cancelOrder': function (event) {
        event.preventDefault();

        var currentParentId;

        $('#parentTradeModal').modal('hide');

        Meteor.call("getParentId", function(error, results) {
            currentParentId = results;
            console.log(currentParentId);
            console.log("Got the selected PID");
        });

        // var target = event.target;
        // var symbol = target.etf_symbol.value;
        // var orderQty = target.orderQty.value;
        // var strategy = target.strategy.value;
        // var account = target.account.value;
        // var side;
        // console.log(target.sell_button.value);
        //
        // side = "sell";
        // console.log(symbol);
        // console.log(orderQty);
        // console.log(strategy);
        // console.log(account);
        // console.log(side);
        //
        // if (strategy== "Time-Weighted Average Price (TWAP)") {
        //     strategy='twap'
        // }
        // //Call the request to the endpoint here
        //
        // Meteor.call("sendTradeRequest", symbol, orderQty, side, strategy, account, function(error, results) {
        //     // console.log(results.content); //results.data should be a JSON object
        //     console.log("Sent a trade request");
        // });

    }

});


