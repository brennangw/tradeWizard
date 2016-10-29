if (process.argv[0] == "help") {
    console.log("good luck!");
    console.log("you need 5 params");
    return;
}

//3rd party modules
var mongojs = require('mongojs');
const finalhandler = require('finalhandler');
const http = require('http');
const Router = require('router');
const url = require('url');
const querystring = require('querystring');

//importing our stuff
var ParentTrade = require('./parentTrade.js');
const EXCHANGE = require('./exchange.js');


//connect to db
var db_url = process.argv[4];

var db = mongojs(db_url);
var collections = {
    "replies" : db.collection('replies_from_the_exchange'),
    "sent" : db.collection('trades_sent_to_exchange')
};


function getQueryFromUrl(urlIn) {
    return querystring.parse(url.parse(urlIn).query);
}

//router set up and routes
var router = Router();
var ptIdSetter = 1;
router.get('/', function (req, res) {
    var query = getQueryFromUrl(req.url);
    var pt = new ParentTrade(   ptIdSetter, query["id"], query["qty"],
                                query["side"], query["price"], 
                                query["iters"], query["interval"],
                                EXCHANGE, db,
                                process.argv[3] === "with_http");
    pt.start();
    ptIdSetter++;
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Aye aye!\n');
});

//make the server
var server = http.createServer(function(req, res) {
  router(req, res, finalhandler(req, res));
});

//start the server
server.listen(process.argv[2]);
console.log("running");
