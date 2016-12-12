/**
 * Created by akankshagupta on 11/30/16.
 */

import { Replies } from '../../../lib/collections/repliesCollection.js';
import { RepliesAggregate } from '../../../lib/collections/repliesCollection.js';
import { MarketData } from '../../../lib/collections/marketData.js';
    // Meteor.subscribe("Tasks");
    var Highcharts = require('highcharts');

// Load module after Highcharts is loaded
    require('highcharts/modules/exporting')(Highcharts);
Template.ReactiveChart.helpers({

        createChart: function () {

            // Getting data for charts

            var timeArray = [];
            var qtyArray = [];

            var time = RepliesAggregate.find({}, {
                sort: {time: -1},
                limit: 5
            }).fetch();


            for(var i = 0; i < time.length; i++) {
                timeArray.push(time[i].time);
                qtyArray.push(time[i].qty);
            }

            console.log(timeArray);
            console.log(qtyArray);

            Meteor.defer(function() {
            Highcharts.chart('chart', {
                chart: {
                    renderTo: 'chart',
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    plotShadow: true,
                    type: 'line'
                },
                title: {
                    text: 'Quantity vs Time'
                },
                subtitle: {
                    text: 'Source: TradeWizard'
                },
                xAxis: {
                    title: {
                        text: 'TimeStamp'
                    },
                    categories: timeArray
                },
                yAxis: {
                    title: {
                        text: 'Quantity Traded'
                    }
                },
                plotOptions: {
                    line: {
                        dataLabels: {
                            enabled: true
                        },
                        enableMouseTracking: false
                    }
                },
                series: [{
                    name: 'Quantity',
                    data: qtyArray
                }]
            })  }); },

    createChart2: function () {

        // Getting data for charts

        var sellquan = Replies.find({side: "sell"}).count();
        var buyquan = Replies.find({side: "buy"}).count();
        console.log("test"+sellquan);
        console.log("test2"+buyquan);
        Meteor.defer(function() {
            Highcharts.chart('chart2', {
                chart: {
                    renderTo: 'chart',
                    plotBackgroundColor: true,
                    plotBorderWidth: null,
                    plotShadow: true,
                    type: 'column'
                },
                title: {
                    text: 'Side(Buy/Sell) Count'
                },
                subtitle: {
                    text: 'Source: TradeWizard'
                },
                xAxis: {
                    categories: ['Trades'],
                    crosshair: true
                },
                yAxis: {
                    title: {
                        text: 'Quantity (ETFs)'
                    }
                },
                plotOptions: {
                    line: {
                        dataLabels: {
                            enabled: true
                        },
                        enableMouseTracking: false
                    },

                        column: {
                            pointPadding: 0.2,
                            borderWidth: 0
                        }

                },
                series: [{
                    name: 'Sell',
                    data: [sellquan]
                }, {
                    name: 'Buy',
                    data: [buyquan]
                }]
            })});
        },

    createChart3: function () {

        var childs = Replies.find({}).count();
        var parents = RepliesAggregate.find({}).count();

        var sum=childs+parents;

        if(sum!=0) {
            var childsfinal = (childs / sum) * 100;
            var parentsfinal = (parents / sum) * 100;
        }
        else {
            var childsfinal = 0;
            var parentsfinal = 0;
        }

        Meteor.defer(function() {
            Highcharts.chart('chart3', {
                chart: {
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    plotShadow: false,
                    type: 'pie'
                },
                title: {
                    text: 'Orders Distribution'
                },
                subtitle: {
                    text: 'Source: TradeWizard'
                },
                tooltip: {
                    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        dataLabels: {
                            enabled: false
                        },
                        showInLegend: true
                    }
                },
                series: [{
                    name: 'Parent Orders',
                    colorByPoint: true,
                    data: [{
                        name: 'Child Orders',
                        y: childsfinal
                    }, {
                        name: 'Parent Orders',
                        y: parentsfinal,
                        sliced: true,
                        selected: true
                    }] }] })});

},

    createChart4: function () {


        var mdata = MarketData.find({}).fetch();
      //  console.log("market: "+mdata);
        var topaskpriceArray = [];
        var topbidpriceArray = [];

        for(var i = 0; i < mdata.length; i++) {
            topaskpriceArray.push(mdata[i].top_ask.price);
            topbidpriceArray.push(mdata[i].top_bid.price);
        }
        console.log("market: "+topaskpriceArray);
        console.log(topbidpriceArray);
        Meteor.defer(function() {
            Highcharts.chart('chart4', {
                chart: {
                    renderTo: 'chart',
                    plotBackgroundColor: true,
                    plotBorderWidth: null,
                    plotShadow: true,
                    type: 'line'
                },
                title: {
                    text: 'PNL : Market'
                },
                subtitle: {
                    text: 'Source: TradeWizard'
                },
                xAxis: {
                    categories: [ 'Time']
                },
                yAxis: {
                    title: {
                        text: 'Price'
                    }
                },
                plotOptions: {
                    line: {
                        dataLabels: {
                            enabled: true
                        },
                        enableMouseTracking: false
                    }
                },
                series: [{
                    name: 'Top Ask',
                    data: topaskpriceArray
                }, {
                    name: 'Top Bid',
                    data: topbidpriceArray
                }]
            })  }); }



});