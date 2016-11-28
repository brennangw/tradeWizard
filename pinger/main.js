
const mongojs = require('mongojs');
const cron = require('node-cron');
var request = require("request");

const exchangeLocation = process.argv[2];
const mongoLocation = process.argv[3];
var ids = process.argv[4].split(",");
var db = mongojs(mongoLocation);
const pingStorage = db.collection('ping_storage');

var delay = (ids.length * 2 + 5).toString();


const saveResponse = function(error, response, body) {
    pingStorage.save(JSON.parse(body), function(err,doc) {
        console.log(doc);
        if (err) {
            console.log(err);
        }
    });
};

var cronString = '*/'+delay+' * * * * *';

var cronPing = cron.schedule(cronString, function () {
    var sleep = require('sleep');
    var index;
    for (index = 0; index < ids.length; index++) {
        console.log("sent request for id" + ids[index]);
        request(exchangeLocation + '/query?id=' + ids[index], saveResponse);
        sleep.sleep(2);
    }
}, false);

cronPing.start();