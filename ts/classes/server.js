const ParentTrade = require('./parentTrade.js');
const http = require('http');
const querystring = require('querystring');
const Router = require('router');
const finalhandler = require('finalhandler');
const url = require('url');

var Server = function (db, exchange) {

    //set up router
    this.router = Router();

    var ptIdSetter = null;
    // var ptIdSetter = 1;
    db.currentPid.findOne({}, function (err,doc) {
        ptIdSetter = doc.pid;
    });
    this.router.get('/', function (req, res) {
        var query = querystring.parse(url.parse(req.url).query);
        var pt = new ParentTrade(
            ptIdSetter, query["id"], query["qty"], query["side"], query["price"],
            query["iters"], query["interval"], exchange, db
        );
        pt.start();
        ptIdSetter++;
        db.currentPid.update({}, { $inc: { pid: 1 } }, function (err) {
            if (err) {
                console.log(err);
            }
        });
        res.setHeader('Content-Type', 'text/plain; charset=utf-8');
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end('Aye aye!\n');
    });

    //make the server
    var that = this;
    this.httpServer = http.createServer(function (req, res) {
        that.router(req, res, finalhandler(req, res));
    });
};

Server.prototype.start = function (port) {
    this.httpServer.listen(port);
};

module.exports = Server;


