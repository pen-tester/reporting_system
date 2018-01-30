var express = require('express');
var report = require('./route/report');
var mongoose = require("mongoose");
var config=require("./config/config");
var bodyParser = require("body-parser");

mongoose.connect(config.mongodb_uri);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(){
    console.log("mongodb is connected to errorsdb");
})


var app=express();
//Set static files for js file..
app.use(express.static('public'));
//Set view engine
app.set('view engine', 'ejs');

app.use(bodyParser.json());  //support json encoded bodies
app.use(bodyParser.urlencoded({extended:true}));  //support encoded bodies


//For the url starts with report
app.use('/report', report);


var server = app.listen(8080, function(){
        var host = server.address().address;
        var port = server.address().port;
        console.log("server started ", host, ":", port);
});