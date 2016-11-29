/**
 * Created by ishanguru on 11/28/16.
 */
import { Mongo } from 'meteor/mongo';

export const Replies = new Mongo.Collection("replies_from_the_exchange");

export const RepliesAggregate = new Mongo.Collection("parents");

if (Meteor.isServer) {

    Meteor.publish('replies', function () {
        return Replies.find({});
    });
    Meteor.publish('replies_aggregate', function () {
        return RepliesAggregate.find({});
    });
} else if (Meteor.isClient) {
    Meteor.subscribe('replies');
    Meteor.subscribe('replies_aggregate');
}