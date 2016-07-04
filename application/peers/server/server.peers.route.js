"use strict";

module.exports = function(){	
	var app = this.app;
	var ami = this.ami;
	var ws = this.ws;

	var peersController = require("./server.peers.controller")(ami,ws);
	
	app.get("/api/peers", peersController.getPeers);
	app.post("/api/addPeer", peersController.addPeer);
	app.delete("/api/delPeer/:objectname", peersController.delPeer);
};