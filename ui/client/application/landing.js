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

Template.landing.events({
    'submit .submitOrderForm'(event) {
        // Prevent default browser form submit
        event.preventDefault();

        // Get value from form element
        const target = event.target;
        const symbol = target.etf_symbol.value;
        const orderQty = target.orderQty.value;
        const strategy = target.strategy.value;
        const account = target.account.value;

        console.log(event);

        // TODO Here we would make the REST call that starts up the Node-exchange server

        // Clear form
        target.text.value = '';
    }
});
