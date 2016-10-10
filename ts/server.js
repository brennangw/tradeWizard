if (process.argv[0] == "help") {
    console.log("good luck!");
}

//3rd party modules
const finalhandler = require('finalhandler');
const http = require('http');
const Router = require('router');
const url = require('url');
const querystring = require('querystring');

//importing our stuff
var ParentTrade = require('./parentTrade.js');

//config variables
const EXCHANGE_LOCATION = "http://localhost:8080/";
const EXCHANGE_SEND_ORDER_PATH = "order"
const EXCHANGE_SOLFP = EXCHANGE_LOCATION + EXCHANGE_SEND_ORDER_PATH;

function getQueryFromUrl(urlIn) {
    return querystring.parse(url.parse(urlIn).query);
}

//router set up and routes
var router = Router();
router.get('/', function (req, res) {
    var query = getQueryFromUrl(req.url);
    var pt = new ParentTrade(   query["id"], query["qty"], 
                                query["side"], query["price"], 
                                query["interval"], query["iters"], 
                                EXCHANGE_SOLFP  );
    pt.start();
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Hello World\n');
});

//make the server
var server = http.createServer(function(req, res) {
  router(req, res, finalhandler(req, res));
});

var port = process.env.PORT;
var ip = process.env.IP;

console.log("here");

//set port
if (process.argv[2] && process.argv[2] != 'env') {
    port = process.argv[2];
}

//set ip
if (process.argv[3] && process.argv[3] != 'env') {
    ip = process.argv[3];
}

if (process.argv[3] && process.argv[3] == 'ns') {
    server.list(port);
    console.log("running with port at: " + port);
} else {
    server.listen(port, ip);
    console.log("running with port at: " + port + " and ip at: " + ip);
}