var http = require('http');

var express = require('express');
var app = express();

var routers = require('./routers');

app.all('*', routers);

var httpServer = http.createServer(app);

httpServer.listen(8080);
