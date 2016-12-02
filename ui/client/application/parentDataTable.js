/**
 * Created by ishanguru on 11/28/16.
 */

import { RepliesAggregate } from '../../lib/collections/repliesCollection.js';

Template.parentDataTable.onCreated(function() {
    console.log("parent data table created");
});

Template.parentDataTable.helpers({
    replies_function : function (){
        var currentPage = Session.get("currentPage");
        skipCount = (currentPage - 1) * 10;
        var allValues = RepliesAggregate.find({}, {
            sort: {pid: -1},
            limit: 7,
            skip: skipCount
        }).fetch();
        return allValues;
    },
    prevPage: function() {
        var currentPage = getCurrentPage();
        var previousPage = currentPage === 1 ? 1 : currentPage - 1;
        return Router.routes.landing.path({page: previousPage});
    },
    nextPage: function() {
        var currentPage = getCurrentPage();
        var nextPage = hasMorePages() ? currentPage + 1 : currentPage;
        return Router.routes.landing.path({page: nextPage});
    },
    prevPageClass: function() {
        return getCurrentPage() <= 1 ? "disabled" : "";
    },
    nextPageClass: function() {
        return hasMorePages() ? "" : "disabled";
    }
});

function hasMorePages() {
    var currentPage = parseInt(Router.current().params.page) || 1;
    var totalCustomers = Counts.get('parentTradeCount');
    var pageLimit = 7;
    return currentPage * pageLimit < totalCustomers;
}

function getCurrentPage() {
    var currentPage = parseInt(Router.current().params.page) || 1;
    Session.set("currentPage", currentPage);
    return currentPage;
}