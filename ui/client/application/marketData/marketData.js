import { MarketData } from '../../../lib/collections/marketData.js';

Template.marketData.onCreated(function bodyOnCreated() {

});

Template.marketData.helpers({
    data : function() {
        return MarketData.findOne({});

    },
    get_Spread : function(top_bid, top_ask) {
        var spreadval= Number (Math.abs(top_bid-top_ask)).toFixed(2);
        return spreadval;

    }


});