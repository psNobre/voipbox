var mongoose = require('mongoose');
var util = require('util');
var colors = require('colors');

module.exports.init = function init(config){
	
	var mongoConfig = config.mongo;
    var path = util.format("%s%s", mongoConfig.host, mongoConfig.db);

    mongoose.connect(path, function(err) {
    	if (err){
            util.log(colors.red("Error to connect MongoDB."));
            return;
    	}

    	util.log(colors.cyan("MongoDB Connected."));
	});

	mongoose.connection.on('disconnected', function () {  
  		util.log(colors.red("MongoDB Disconnected."));
	});

    return mongoose;

};

