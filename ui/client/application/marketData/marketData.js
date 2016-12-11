import { MarketData } from '../../../lib/collections/marketData.js';

Template.marketData.onCreated(function bodyOnCreated() {
    // this.subscribe("marketData");
});

Template.marketData.helpers({
    data : function() {
        console.log("I am being called");
        return MarketData.findOne({});

    }
});