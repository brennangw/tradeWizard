/**
 * Created by ishanguru on 11/28/16.
 */

import { RepliesAggregate } from '../../lib/collections/repliesCollection.js';
import { Replies } from '../../lib/collections/repliesCollection.js';

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
    },

    progress_function2 : function (currentParentId) {

        var totalCount= Replies.find({parentTradeId:currentParentId}).fetch().length;
        var successCount=Replies.find({parentTradeId:currentParentId, status:"SUCCESS"}).fetch().length;
        if(totalCount!=0)
        {
            var progress=(successCount/totalCount)*100;
        }
        else
        {
            var progress=0;

        }
        console.log(successCount);
        console.log(totalCount);

        return progress;
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