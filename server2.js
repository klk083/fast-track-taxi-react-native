var fs = require('fs');
var http = require('http');
/*
var https = require('https');
var privateKey = fs.readFileSync('priv_and_pub.key', 'utf-8');
var certificate = fs.readFileSync('CA.crt', 'utf-8');
var credentials = {key: privateKey, cert: certificate};
 */
var jwt = require('jsonwebtoken');

var express = require('express');
var app = express();

var routers = require('./routers');

app.all('*', routers);

var httpServer = http.createServer(app);
//var httpsServer = https.createServer(credentials, app);

httpServer.listen(8080);
//httpsServer.listen(8443);
