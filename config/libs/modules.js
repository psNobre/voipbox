"use strict";

var path = require("path");

// initialize all app
module.exports.init = function start(params){
	var config = params.config;

	// Initialize all models files
	initServerFiles(config.files.server.models, params);

    // Initialize all service files
    initServerFiles(config.files.server.services, params);
    
    // Initialize all route files
    initServerFiles(config.files.server.routes, params);


};

function initServerFiles(files, params){
    files.forEach(function(file){
        var moduleExports = require(path.resolve(process.cwd(), file));
        typeof moduleExports == "function" && (moduleExports.call(params));
    });
};

