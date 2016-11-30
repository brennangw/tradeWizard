/**
 * Created by ishanguru on 11/30/16.
 */

import { Replies } from '../../../lib/collections/repliesCollection.js';

Template.blotterDataTable.helpers({
    blotter_function : function () {
        var allValues = Replies.find({}).fetch();
        return allValues;
    }
});