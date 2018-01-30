var  express = require('express');
var router = express.Router();
var Util = require('../utils/utils');

var reports_model = require("../models/reports");

//Middleware for this router
router.use(function timeLog (req,res, next){
   // console.log('Time: ', Date.now(), 'Requests: ', req);
    next();
});

router.post("/report", function(req,res){
    var report = new reports_model();
    report.type='report';
    report.error = req.body.error;
    report.info = req.body.info;
    report.user_agent= req.headers['user-agent'];
    report.ip= req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    report.time =Util.formatDate(new Date(),"yyyy-MM-dd hh:mm:ss");
    report.save(function(err, report, numAffected){
        if(err) return console.error(err);
        console.log("Added new report to report collection:", report, numAffected);
    });
    console.log(req.body);
    res.send("Show test");
})

module.exports = router;