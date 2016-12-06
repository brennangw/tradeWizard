/**
 * Created by ishanguru on 12/6/16.
 */

var status;

Template.childReply.onCreated( function(){
    status = $('#status').attr("class");
});

Template.childReply.helpers({
    success_function : function () {
        if (status=="SUCCESS") {
            return true;
        }
        else {
            return false;
        }
    }
});

Template.childReply.events({

    'click #editTrade': function (event) {
        event.preventDefault();

        console.log("edit trade clicked");

        // var currentTD = $(this).parents('tr').find('td');
        // $.each(currentTD, function() {$(this).prop('contenteditable', true)});

        // if ($(this).html() == 'Edit') {
        //     $.each(currentTD, function () {
        //         $(this).prop('contenteditable', true)
        //     });
        // } else {
        //     $.each(currentTD, function () {
        //         $(this).prop('contenteditable', false)
        //     });
        // }



        // var currentParentId = Session.get('post');
        // var mode = "stop";
        //
        // var email = Meteor.user().emails[0].address;
        // console.log(email);
        //
        // $('#parentTradeModal').modal('hide');
        //
        // Meteor.call("getParentId", function(error, results) {
        //     currentParentId = results;
        //     // console.log(currentParentId);
        //     // console.log("Got the selected PID");
        // });
        // console.log(currentParentId);
        //
        // Meteor.call("stopOrder", currentParentId, mode, email, function() {
        //     // console.log(results);
        //     console.log(currentParentId);
        //     console.log("Cancelled a trade request");
        // });

    }
});