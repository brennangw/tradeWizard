const mongojs = require('mongojs');
const cron = require('node-cron');
var request = require("request");

const exchangeLocation = process.argv[2];
const mongoLocation = process.argv[3];
var db = mongojs(mongoLocation);
const pingStorage = db.collection('ping_storage');
const ids = [1];

const saveResponse = function(error, response, body) {
    pingStorage.save(JSON.parse(body), function(err,doc) {
        console.log(doc);
        if (err) {
            console.log(err);
        }
    });
}

var cronPing = cron.schedule('*/1 * * * * *', function () {
    var index;
    for (index = 0; index < ids.length; index++) {
        console.log("sent request for id" + ids[index]);
        request(exchangeLocation + '/query?id=' + ids[index], saveResponse);
    }
}, false);

cronPing.start();