//3rd party modules
const finalhandler = require('finalhandler')
const cron = require('node-cron');
const http = require('http');
const Router = require('router')

//importing our stuff

var counter = 1;

//router set up and routes
var router = Router()
router.get('/', function (req, res) {
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.writeHead(200, {'Content-Type': 'text/plain'});
    const copy_of_counter = counter;
    if (counter % 2 == 0) {
        cron.schedule('*/3 * * * * *', function() {
            console.log('running a task 3 secs this is the ' + copy_of_counter);
        });
    } else {
        cron.schedule('*/2 * * * * *', function() {
            console.log('running a task 2 secs this is the ' + copy_of_counter);
        });
    }
    counter++;
    res.end('Hello World\n');
})

//make the server
var server = http.createServer(function(req, res) {
  router(req, res, finalhandler(req, res));
})

//run the server
server.listen(process.env.PORT, process.env.IP);
console.log("server should be running");