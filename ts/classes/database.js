//connect to db

const Router = require('router');
const mongojs = require('mongojs');

var Database = function (db_url) {
    this.mongoConnection = mongojs(db_url);
    this.replies = this.mongoConnection.collection('replies_from_the_exchange');
    this.sent = this.mongoConnection.collection('trades_sent_to_exchange');
    this.currentPid = this.mongoConnection.collection('pid');
    var that = this;
    this.currentPid.findOne({}, function(err, doc) {
        if (!doc) {
            that.currentPid.save({pid: 1});
        }
    });
}


module.exports = Database;