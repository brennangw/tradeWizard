import { MarketData } from '../../../lib/collections/marketData.js';

Template.marketData.onCreated(function bodyOnCreated() {
    // this.subscribe("marketData");
});

Template.marketData.helpers({
    data : function() {
        return MarketData.findOne({});
    }
});