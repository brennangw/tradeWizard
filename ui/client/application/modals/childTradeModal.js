/**
 * Created by ishanguru on 11/28/16.
 */

import { Replies } from '../../../lib/collections/repliesCollection.js';

Template.childDataTable.helpers({
    modal_function : function () {

        var currentParentId = Session.get('post');
        console.log(currentParentId);

        return Replies.find({parentTradeId:currentParentId}).fetch();
    }
});

Template.parentTradeModalTemplate.events({

    'click #cancelOrder': function (event) {
        event.preventDefault();

        var currentParentId;
        var mode = "stop";

        $('#parentTradeModal').modal('hide');

        Meteor.call("getParentId", function(error, results) {
            currentParentId = results;
            console.log(currentParentId);
            console.log("Got the selected PID");
        });

        Meteor.call("stopOrder", currentParentId, mode,  function(error, results) {
            // console.log(results);
            console.log(currentParentId);
            console.log("Cancelled a trade request");
        });

        //display popover on success

    }

});


