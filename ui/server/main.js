import { Meteor } from 'meteor/meteor';

var globalParentId;

Meteor.startup(function() {

    var PORT = 8081;
    Meteor.methods({
        passParentId: function(parentId) {
          this.unblock();
          globalParentId = parentId;
        },

        getParentId: function() {
            this.unblock();
            return globalParentId;
        },

        stopOrder: function(parentId, mode, email) {
            this.unblock();
           // console.log("Stopping order: ");
            // console.log(parentId);

            try {
                var request_string = "http://localhost:" + PORT +
                    "/?pid=" + parentId +
                    "&" +
                    "mode=" + mode +
                    "&email=" + email;
                var request = Meteor.http.call("GET", request_string);

            }
            catch(err){
              //  console.log(err.message);
            }
           // console.log("Made it to the end of the call");
        },

        changeOrderType: function(parentId, mode, email) {
            this.unblock();
            //console.log("Stopping order: ");
            //console.log(parentId);

            mode = "twapToImmediate";

            try {
                var request_string = "http://localhost:" + PORT +
                    "/?pid=" + parentId +
                    "&" +
                    "mode=" + mode +
                    "&email=" + email;
                var request = Meteor.http.call("GET", request_string);

            }
            catch(err){
              //  console.log(err.message);
            }
        },

        sendTradeRequest: function(etfSymbol, orderQty, side, tradeStrategy, accountNumber, email) {
            this.unblock();


        try {
            var request_string = "http://localhost:" + PORT +
                "/?id=3&" +
                "qty=" + orderQty +
                "&side=" + side +
                "&mode=" + tradeStrategy +
                "&email=" + email;
            var request = Meteor.http.call("GET", request_string);


            }
            catch(err){
               // console.log(err.message);
            }
            // return request;
           // console.log("Made it to the end of the call");
        }
    });
});
