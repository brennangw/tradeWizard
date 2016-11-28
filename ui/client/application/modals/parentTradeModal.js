/**
 * Created by ishanguru on 11/28/16.
 */


//Landing page helper functions

Meteor.subscribe("replies");
Template.parentTradeModalTemplate.helpers({

    modal_function : function () {
        console.log(Replies.findOne({}));
        return (Replies.find({}, {limit: 1, sort:{timestamp:-1}}).fetch());

    },
    // tradeWizard login screen.png
    parentTableSettings : function () {
        return {
            rowsPerPage: 10,
            showNavigation: 'auto',
            fields: [
                { key: 'parentTradeId', label: 'PID'},
                { key: 'childTrade', label: 'CID'},
                { key: 'qty', label: 'Quantity' },
                { key: 'side', label: 'Side' },
                { key: 'avg_price', label: 'Average Price' },
                { key: 'status', label: 'Execution Status' },
                { key: 'readable_time', label: 'Time', hidden: false},
                { key: 'time', label: 'Time', sortDirection: 'descending', sortOrder: 0, hidden: true}
            ],
            showFilter: false,
            useFontAwesome: true
        };
    }

});

Template.parentTradeModalTemplate.events({
    //
    // 'click .reactive-table tbody tr': function (event) {
    //     // set the blog post we'll display details and news for
    //     var post = this;
    //     Session.set('post', post);
    //     console.log(post.parentTradeId);
    //
    //     $('#parentTradeModal').modal('show');
    //
    //     //display the modal here based on the parent trade ID, list the filters
    // }
});


