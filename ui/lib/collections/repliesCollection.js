/**
 * Created by ishanguru on 11/28/16.
 */
import { Mongo } from 'meteor/mongo';

export const Replies = new Mongo.Collection("replies_from_the_exchange");

if (Meteor.isServer) {

    Meteor.publish('replies', function () {
        return Replies.find({});
    });
} else if (Meteor.isClient) {
    Meteor.subscribe('replies');
}