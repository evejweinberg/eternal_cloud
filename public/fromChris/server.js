/*
  Simple API
  class by Craig Pickard
  with express, requestify
*/

// require() is node's way of saying "import"
var express = require('express');

// create an instance of an express app
var app = express();

// Requestify object
var requestify = require('requestify');

// set the app's port
var httpPort = 3030;
app.set('port',httpPort);

var bodyParser = require('body-parser');
app.use(bodyParser.json());

// Mail Module
var mailModule = require('./mail')();

// finally, lets create the server
var server = require('http').Server(app); // same as http.Server(app); with var http = require('http');
server.listen(httpPort);

console.log("server listening on port " + httpPort);

app.get('/sendMail', function(req,res){
  mailModule.sendEmail();
  res.send('emails been sent');
})
