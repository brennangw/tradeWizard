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

Template.parentTradeModalTemplate.helpers({
    progress_function : function () {

        var currentParentId = Session.get('post');
        console.log(currentParentId);
        // count for trades that are successful
        var totalCount= Replies.find({parentTradeId:currentParentId}).fetch().length;
        var successCount=Replies.find({parentTradeId:currentParentId, status:"SUCCESS"}).fetch().length;
        if(totalCount!=0)
        {
            var progress=(successCount/totalCount)*100;
        }
        else
        {
            var progress=0;

        }
        console.log(successCount);
        console.log(totalCount);

        //var temp = "\"width:" + progress + "%";

        return progress;
    }
});

Template.parentTradeModalTemplate.events({

    'click #cancelOrder': function (event) {
        event.preventDefault();

        var currentParentId = Session.get('post');
        var mode = "stop";

        var email = Meteor.user().emails[0].address;
        console.log(email);

        $('#parentTradeModal').modal('hide');

        Meteor.call("getParentId", function(error, results) {
            currentParentId = results;
            // console.log(currentParentId);
            // console.log("Got the selected PID");
        });
        console.log(currentParentId);

        Meteor.call("stopOrder", currentParentId, mode, email, function() {
            // console.log(results);
            console.log(currentParentId);
            console.log("Cancelled a trade request");
        });

        //display popover on success

    }

});


