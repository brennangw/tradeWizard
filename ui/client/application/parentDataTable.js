/**
 * Created by ishanguru on 11/28/16.
 */

import { RepliesAggregate } from '../../lib/collections/repliesCollection.js';

// var skipCount;

Template.parentDataTable.onCreated(function() {
    // var template = this;
    // this.subscribe("marketData");
    console.log("parent data table created");
    // var currentPage = parseInt(Router.current().params.page) || 1;
    // skipCount = (currentPage - 1) * 10; // 10 records per page
});

Template.parentDataTable.helpers({
    replies_function : function (){
        var currentPage = Session.get("currentPage");
        skipCount = (currentPage - 1) * 10;
        var allValues = RepliesAggregate.find({}, {
            sort: {pid: -1},
            limit: 10,
            skip: skipCount
        }).fetch();
        return allValues;
    },
    prevPage: function() {
        var currentPage = parseInt(Router.current().params.page) || 1;
        Session.set("currentPage", currentPage);
        var previousPage = currentPage === 1 ? 1 : currentPage - 1;
        console.log(currentPage);
        console.log(previousPage);
        return Router.routes.landing.path({page: previousPage});
    },
    nextPage: function() {
        var currentPage = parseInt(Router.current().params.page) || 1;
        Session.set("currentPage", currentPage);
        var nextPage = currentPage + 1;
        console.log(currentPage);
        console.log(nextPage);
        return Router.routes.landing.path({page: nextPage});
    }
});