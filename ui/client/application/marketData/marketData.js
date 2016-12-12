import { MarketData } from '../../../lib/collections/marketData.js';

Template.marketData.onCreated(function bodyOnCreated() {
    // this.subscribe("marketData");
});

Template.marketData.helpers({
    data : function() {
        // console.log("I am being called");
        return MarketData.findOne({});

    },
    get_Spread : function(top_bid, top_ask) {
        // console.log("I am being called");
        var spreadval= Number (Math.abs(top_bid-top_ask)).toFixed(2);
        return spreadval;

    }


});