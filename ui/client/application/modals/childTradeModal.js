/**
 * Created by ishanguru on 11/28/16.
 */

import { Replies } from '../../../lib/collections/repliesCollection.js';

Template.childDataTable.helpers({
    modal_function : function () {

        var currentParentId = Session.get('post');
      //  console.log(currentParentId);

        return Replies.find({parentTradeId:currentParentId}).fetch();
    }
});

Template.parentTradeModalTemplate.helpers({
    progress_function : function () {

        var currentParentId = Session.get('post');
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

        return progress;
    }
});

Template.parentTradeModalTemplate.events({

    'click #cancelOrder': function (event) {
        event.preventDefault();

        var currentParentId = Session.get('post');
        var mode = "stop";

        var email = Meteor.user().emails[0].address;

        $('#parentTradeModal').modal('hide');

        Meteor.call("getParentId", function(error, results) {
            currentParentId = results;
        });

        Meteor.call("stopOrder", currentParentId, mode, email, function() {

        });

    }

});


