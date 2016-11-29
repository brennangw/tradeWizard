/**
 * Created by ishanguru on 11/28/16.
 */

import { RepliesAggregate } from '../../lib/collections/repliesCollection.js';

Template.parentDataTable.helpers({
    replies_function : function () {
        var allValues = RepliesAggregate.find({}, {sort: {pid: -1}}).fetch();
        return allValues;
    }
});