"use strict";

var express = require('./express');
var modules = require('./modules');
var asterisk = require('./asterisk');
var websocket = require('./websocket')
var mongoose = require('./mongoose');
var ldap = require('./ldap');

// initialize all app
module.exports.start = function start(params){
	
	params.ami = asterisk.init(params.config);
	params.ws = websocket.init(params.server);
	params.ldapClient = ldap.init(params.config);
	params.db = mongoose.init(params.config);

	express.init(params);
	modules.init(params);
};