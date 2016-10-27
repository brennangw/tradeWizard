
//Landing page helper functions
Replies = Meteor.Collection("replies");

Template.landing.helpers({
    replies : function () {
        return Replies.find({});
    }
});

Template.createOrderForm.events({
    'submit .submitOrderForm': function(event) {
        // Prevent default browser form submit
        event.preventDefault();

        // Get value from form element
         var symbol = event.target.etf_symbol.value;
         var orderQty = event.target.orderQty.value;
         var strategy = event.target.strategy.value;
         var account = event.target.account.value;

        // Clear form
        symbol = '';
        orderQty = '';
        strategy = '';
        account = '';
    }
});
