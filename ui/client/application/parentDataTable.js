/**
 * Created by ishanguru on 11/28/16.
 */

import { Replies } from '../../lib/collections/repliesCollection.js';

Template.parentDataTable.helpers({

    replies_function : function () {
        return Replies.find({parentTradeId:111}).fetch();
    }
});