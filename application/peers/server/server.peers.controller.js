"use strict";
var colors = require('colors');
var peers = require("./server.peers.model");
var peersService = require("./server.peers.service");
var util = require('util');

module.exports = function(ami, ws){

	peersService.initService(ami, ws);

	return{
		getPeers: getPeers,
		addPeer: addPeer,
		delPeer: delPeer
	};

	function getPeers(req, res){
		res.json(peers.get());
	};

	function addPeer(req, res){
		var peer = req.body;
		peersService.addPeer(peer, ami, function (err, response) {
			if (err) {
				return res.status(404).end("Problems in Peer Added!");
			}else{
				peersService.reloadPeers(ami);
				res.json("Peer Added Successful");

			}
		});
	}

	function delPeer(req, res){
		var peerObjectId = req.params.objectname;
		peersService.delPeer(peerObjectId, ami, function (err, response) {
			if (err) {
				return res.status(404).end("Problems in Delete Peer!");
			}else{
				peers.del(peerObjectId);
				peersService.reloadPeers(ami);
				res.json("Peer Deleted Successful");

			}
		});
	}
}
