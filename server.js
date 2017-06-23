//  OpenShift sample Node application
var express = require('express'),
    fs      = require('fs'),
    app     = express();

// var port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080,
//    ip   = process.env.IP   || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';

//Setup ip adress and port
var ipaddress ;

function initIPAdress() {
    var adr = process.env.OPENSHIFT_NODEJS_IP;
    if (typeof adr === "undefined") {
            //  Log errors on OpenShift but continue w/ 127.0.0.1 - this
            //  allows us to run/test the app locally.
            console.warn('No OPENSHIFT_NODEJS_IP var, using localhost');
            adr = 'localhost';
    }

    ipaddress = adr;
}

var port      = process.env.OPENSHIFT_NODEJS_PORT || 8080;

app.get('/', function (req, res) {
  // try to initialize the db on every request if it's not already
  // initialized.
    res.sendFile('index.html');
});

// error handling
app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500).send('Something bad happened!');
});

initIPAdress(); //Setup IP adress before app.listen()

app.listen(port, ipaddress, function() {
    console.log('%s: Node server started on %s:%d ...', Date(Date.now() ), ipaddress, port);
});

// module.exports = app;
