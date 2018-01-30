var mongoose = require("mongoose");

var reports_schema = mongoose.Schema({
    type:String,
    error:mongoose.Schema.Types.Mixed,
    info:mongoose.Schema.Types.Mixed,
    user_agent:String,
    ip:String,
    time:String
});

var reports = mongoose.model('reports', reports_schema);

module.exports  = reports;