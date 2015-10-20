var express = require('express');
var app = express();
app.use(express.static('public'));

var server = app.listen(9000);
var options = {debug: true};
app.use('/peerjs', require('peer').ExpressPeerServer(server, options));


app.get('/', function(req, res, next) {
  res.send('hello world');
})