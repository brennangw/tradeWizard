/**
 * Created by ishanguru on 11/28/16.
 */

import { RepliesAggregate } from '../../lib/collections/repliesCollection.js';

Template.parentDataTable.helpers({
    replies_function : function () {
        var allValues = RepliesAggregate.find({}).fetch();
        // var distinctArray = _.uniq(allValues, false, function(d) {return d.foo});
        // var distinctValues = _.pluck(distinctArray, 'foo');
        console.log(allValues);
        return allValues;
    }
});