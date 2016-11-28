import { Mongo } from 'meteor/mongo';
export const MarketData = new Mongo.Collection("ping_storage");

if (Meteor.isServer) {
    // This code only runs on the server
    // Only publish tasks that are public or belong to the current user
    Meteor.publish('marketData', function marketDataPublication() {
        return MarketData.find({});
    });
} else if (Meteor.isClient) {
    Meteor.subscribe('marketData');
}