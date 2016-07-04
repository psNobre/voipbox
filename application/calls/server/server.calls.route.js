"use strict";

var callsController = require("./server.calls.controller");

module.exports = function(){	
	var app = this.app;

	app.get("/api/calls", callsController.getCalls);
	app.post("/api/rmvcalls", callsController.rmvCalls);
};