import { MarketData } from '../../../lib/collections/marketData.js';

Template.marketData.onCreated(function bodyOnCreated() {
    this.subscribe("marketData");
    console.log(MarketData.findOne({}));
    console.log("test");
    // console.log(md.findOne({}));
    // return MarketData.findOne({});
});

Template.marketData.helpers({
    data() {
        console.log("test");
        // console.log(MarketData.findOne({}));
        // return MarketData.findOne({});
    }
});