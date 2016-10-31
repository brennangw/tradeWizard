Meteor.subscribe('replies');
var Replies = new Meteor.Collection('replies');

if (Meteor.isClient) {

    Template.landing.helpers({
        fields: function () {
            return ['Id','Quantity','Side', 'Average Price', 'Timestamp'];
        }
    });


   // Template.landing.helpers({
    //    fields : function () {
      //      return Replies.find().fetch();
       // return['',''];
       // }
    //});
}

if (Meteor.isServer) {
    Meteor.startup(function () {

    });

    ReactiveTable.publish('replies', function () { return Replies; });
}




//Landing page helper functions
//Meteor.subscribe('replies');
//Replies = new Meteor.Collection("replies");


//Template.landing.helpers({
    //replies : function () {
    //return Replies.find().fetch();
  //   }
//});

Template.landing.events({
    // 'submit form': function(event) {
    //     console.log("TEST")
    // }
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


        //Call the request to the endpoint here

        Meteor.call("sendTradeRequest", symbol, orderQty, side, strategy, account, function(error, results) {
            // console.log(results.content); //results.data should be a JSON object
            console.log("Sent a trade request");
        });

    }
});

