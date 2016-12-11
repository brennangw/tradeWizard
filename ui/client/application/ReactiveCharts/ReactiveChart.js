/**
 * Created by akankshagupta on 11/30/16.
 */

import { Replies } from '../../../lib/collections/repliesCollection.js';


    // Meteor.subscribe("Tasks");
    var Highcharts = require('highcharts');

// Load module after Highcharts is loaded
    require('highcharts/modules/exporting')(Highcharts);
Template.ReactiveChart.helpers({

        createChart: function () {

            Meteor.defer(function() {
            Highcharts.chart('chart', {
                chart: {
                    renderTo: 'chart',
                    type: 'line'
                },
                title: {
                    text: 'Monthly Average Temperature'
                },
                subtitle: {
                    text: 'Source: WorldClimate.com'
                },
                xAxis: {
                    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
                },
                yAxis: {
                    title: {
                        text: 'Temperature (°C)'
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
                    name: 'Tokyo',
                    data: [7.0, 6.9, 9.5, 14.5, 18.4, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
                }, {
                    name: 'London',
                    data: [3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8]
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
                    type: 'column'
                },
                title: {
                    text: 'Side(Buy/Sell) Count'
                },
                subtitle: {
                    text: 'Source: TradeWizards'
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
            })  }); }


      });