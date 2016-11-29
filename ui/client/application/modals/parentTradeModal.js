/**
 * Created by ishanguru on 11/28/16.
 */

Meteor.subscribe("replies");
Template.parentTradeModalTemplate.helpers({

    modal_function : function () {
        console.log(Replies.findOne({}));
        return (Replies.find({}, {limit: 1, sort:{timestamp:-1}}).fetch());

    }

});

Template.parentTradeModalTemplate.events({

});


