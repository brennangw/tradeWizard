/**
 * Created by ishanguru on 12/6/16.
 */

var status;


Template.childReply.onCreated( function(){
    status = $('#status').attr("class");


});

Template.childReply.helpers({
    success_function : function () {
        if (status=="IN PROGRESS") {
            return true;
        }
        else {
            return false;
        }
    },

    mcalculator: function (qty,avg_price) {
       var val= Number (qty*avg_price).toFixed(2);
        return val;

    }
});

Template.childReply.events({

    'click #editTrade': function (event) {
        event.preventDefault();

        var id = '#' + this._id._str;

        $(id).each(function () {
            $.each(this.cells, function(){
                $(this).prop('contenteditable', true);
                $(this).toggleClass('editable');
            });
        });

        $('#editTrade').toggleClass('hidden');
        $('#saveTrade').toggleClass('hidden');

    },

    'click #saveTrade': function (event) {
        event.preventDefault();

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