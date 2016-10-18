/**
 * Created by ishanguru on 10/18/16.
 */

//Landing page helper functions

Replies = Meteor.Collection("replies");

Template.landing.helpers({
    replies : function () {
        return Replies.find({});
    }
});