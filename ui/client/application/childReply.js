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

        var clss = $('#editTrade').attr('oid');
        console.log(clss);

        // crr = '[' + clss +']';
        //
        // var temp = document.querySelectorAll(crr);
        // console.log(temp);

        console.log("edit trade clicked");
        console.log(this._id._str);
        var id = '#' + this._id._str;

        $(id).each(function () {
            // $(id).toggleClass('selectedRow');
            $.each(this.cells, function(){
                $(this).prop('contenteditable', true);
                $(this).toggleClass('editable');
            });
        });

        $('#editTrade').toggleClass('hidden');
        $('#saveTrade').toggleClass('hidden');

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

    },

    'click #saveTrade': function (event) {
        event.preventDefault();

        console.log(this._id._str);
        var id = '#' + this._id._str;

        $(id).each(function () {
            $.each(this.cells, function(){
                $(this).prop('contenteditable', false);
                $(this).toggleClass('editable');
            });
        });

        $('#editTrade').toggleClass('hidden');
        $('#saveTrade').toggleClass('hidden');

    }

});