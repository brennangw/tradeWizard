import { Replies } from '../../lib/collections/repliesCollection.js';

Template.Reply.helpers({
    progress_function2: function (currentParentId) {

        var totalCount = Replies.find({parentTradeId: currentParentId}).fetch().length;
        var successCount = Replies.find({parentTradeId: currentParentId, status: "SUCCESS"}).fetch().length;
        if (totalCount != 0) {
            var progress = (successCount / totalCount) * 100;
        }
        else {
            var progress = 0;

        }

        return progress;
    }
});