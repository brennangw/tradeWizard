//server.js
const TwapParentTrade = require("./twapParentTrade.js");
const ImmediateParentTrade = require("./immediateParentTrade.js");
const http = require("http");
const querystring = require("querystring");
const Router = require("router");
const finalhandler = require("finalhandler");
const url = require("url");

var Server = function (db, exchange) {

    //set up router
    this.router = Router();

    var ptIdSetter = null;
    // var ptIdSetter = 1;
    db.currentPid.findOne({}, function (err, doc) {
        ptIdSetter = doc.pid;
    });
    this.router.get('/', function (req, res) {
        var pts = {};
        var query = querystring.parse(url.parse(req.url).query);
        var pt = null;
        var mode = query["mode"];
        var response = null;
        if (mode === "twap") {
            pt = new TwapParentTrade(
                ptIdSetter, query["uid"], query["id"], parseInt(query["qty"]),
                query["side"], exchange, db
            );
            pts[ptIdSetter] = pt;
            response = "Started TWAP Trade";
        } else if (mode === "immediate") {
            pt = new ImmediateParentTrade(
                ptIdSetter, query["uid"], query["id"], parseInt(query["qty"]),
                query["side"], exchange, db
            );
            pts[ptIdSetter] = pt;
            response = "Started Immediate Trade";
        } else if (mode === "twapToImmediate") {
            var pt = pts[query["pid"]];
            if (pt instanceof TwapParentTrade) {
                response = pt.finishNow();
            }
        } else if (mode === "stop") {
            var pt = pts[query["pid"]];
            if (pt instanceof TwapParentTrade ||
                pt instanceof ImmediateParentTrade) {
                response = pt.stop();
            }
        } else if (mode === "newAmount" ) {
            var pt = pts[query["pid"]];
            if (pt instanceof TwapParentTrade ||
                pt instanceof ImmediateParentTrade) {
                response = pt.adjustQtyToTrade(query["newAmount"]);
            }
        } else {
            res.setHeader('Content-Type', 'text/plain; charset=utf-8');
            res.writeHead(400, {'Content-Type': 'text/plain'});
            res.end('Your params are bad!\n');
            return;
        }

        ptIdSetter++;
        db.currentPid.update({}, { $inc: { pid: 1 } }, function (err) {
            if (err) {
                console.log(err);
            }
        });
        res.setHeader('Content-Type', 'text/plain; charset=utf-8');
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end(response + '\n');
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


