var fs = require('fs');
//var http = require('http');
var https = require('https');
var privateKey = fs.readFileSync('/etc/letsencrypt/live/ftt.idi.ntnu.no/privkey.pem', 'utf-8');
var certificate = fs.readFileSync('/etc/letsencrypt/live/ftt.idi.ntnu.no/fullchain.pem', 'utf-8');
var credentials = {key: privateKey, cert: certificate};

var jwt = require('jsonwebtoken');

var express = require('express');
var app = express();

var routers = require('./routers');

app.all('*', routers);

//var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);

//httpServer.listen(80);
httpsServer.listen(443);
