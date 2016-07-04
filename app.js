"use strict";
/*  Production Mode  */
// process.env.NODE_ENV = "production";

var config = require("./config/global");

/*  Modules */
var express = require("express");
var http = require("http");
var util = require("util");
var colors = require('colors');

/*  Instances  */
var app = express();
var server = http.createServer(app);

/*  Libs  */
var myApplication = require("./config/libs/app");

/*  Start application */
myApplication.start({
	app: app, 
	server: server, 
	config: config
});

server.listen(config.port, config.host, function(){
	util.log(colors.green(util.format("Server is running (%s:%s)", config.hostname, config.port)));
});

