// get command line arguments
const serverPort = process.argv[2];
const exchangeLocation = process.argv[3];
const mongoLocation = process.argv[4];

//get classes
const Exchange = require("./classes/exchange.js");
const ReceiverServer = require("./classes/server.js");
const Database = require("./classes/database.js");

//set up class instances
var db = new Database(mongoLocation);
var exchange = new Exchange(exchangeLocation);
var server = new ReceiverServer(db, exchange);

//start the server
server.start(serverPort);
