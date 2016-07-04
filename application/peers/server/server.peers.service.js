"use strict";
var peers = require("./server.peers.model");
var colors = require('colors');
var util = require('util');

exports.addPeer = addPeer;
exports.delPeer = delPeer;
exports.initService = initService;
exports.reloadPeers = reloadPeers;

function addPeer(peer, ami, callback) {

	var amiAction = {
		action: 'UpdateConfig',
		reload: 'yes',
		srcfilename: 'sip.conf',
		dstfilename: 'sip.conf',

		'Action-000000': 'NewCat',
		'Cat-000000': peer.extension,

		'Action-000001': 'Append',
		'Cat-000001': peer.extension,
		'Var-000001': 'type',
		'Value-000001': peer.type,

		'Action-000002': 'Append',
		'Cat-000002': peer.extension,
		'Var-000002': 'regexten',
		'Value-000002': peer.extension,

		'Action-000003': 'Append',
		'Cat-000003': peer.extension,
		'Var-000003': 'defauluser',
		'Value-000003': peer.name,

		'Action-000004': 'Append',
		'Cat-000004': peer.extension,
		'Var-000004': 'secret',
		'Value-000004': peer.password,

		'Action-000005': 'Append',
		'Cat-000005': peer.extension,
		'Var-000005': 'host',
		'Value-000005': peer.host,

		'Action-000006': 'Append',
		'Cat-000006': peer.extension,
		'Var-000006': 'context',
		'Value-000006': peer.context
	};

	ami.action(amiAction, function(err, res){
		if (err) {
			callback(true, res);

		} else {
			callback(false, res);
		}
	});
}

function delPeer(peerObjectId, ami, callback) {
	var amiActionDelete = {
		action: 'UpdateConfig',
		reload: 'yes',
		srcfilename: 'sip.conf',
		dstfilename: 'sip.conf',

		'Action-000000': 'DelCat',
		'Cat-000000': peerObjectId
	};

	ami.action(amiActionDelete, function(err, res){
		if (err) {
			callback(true, res);

		} else {
			callback(false, res);
		}
	});
}

function initService(ami, ws) {

	String.prototype.contains = function(it) { return this.indexOf(it) != -1; };

	var timeout = 2000;

	setTimeout(function(){
		ami.action({'action':'sippeers', 'actionid':'getpeers'}, function(err, res) {});
	}, timeout);

	ami.on('peerentry', function(data) {

		if (data.actionid.contains("getpeers")) {

			if (data.status.contains("OK")){
				if (data.ipaddress == "-none-") {
					data.status = "Unknown";
				};
				data.status = "Reachable";
			};
			if (data.status.contains("UNKNOWN")){
				data.status = "Unknown";
			};
			if (data.status.contains("UNREACHABLE")){
				data.status = "Unreachable";
			};

			util.log(colors.yellow("Get Peers"));
			ws.clients.forEach(function(client){
				client.send(JSON.stringify(data));
			});

			peers.set(data.objectname, data);
		};

		if (data.actionid.contains("reloadpeers")) {

			if (data.status.contains("OK")){
				if (data.ipaddress == "-none-") {
					data.status = "Unknown";
				};
				data.status = "Reachable";
			};
			if (data.status.contains("UNKNOWN")){
				data.status = "Unknown";
			};
			if (data.status.contains("UNREACHABLE")){
				data.status = "Unreachable";
			};

			util.log(colors.yellow("Reload Peers"));
			ws.clients.forEach(function(client){
				client.send(JSON.stringify(data));
			});

			peers.set(data.objectname, data);

		};
	});

	ami.on('peerlistcomplete', function(data) {
		if (data.actionid.contains("getpeers")) {
			ami.on('peerstatus', function(data) {	
				var peerId = data.peer.replace("SIP/", "");
				var peer = peers.get(peerId);
				if (peer !== undefined) {
					peer.status = data.peerstatus;

					if (data.peerstatus == "Registered") {
						var ipPort = data.address.split(":");
						var peerIp = ipPort[0];
						var peerPort = ipPort[1];

						peer.ipaddress = peerIp;
						peer.ipport = peerPort;
					};

					peers.set(peerId, peer);

					util.log(colors.yellow("Sending Changes"));
					ws.clients.forEach(function(client){
						client.send(JSON.stringify(peer));
					});
				};
			});
		}
	});
}

function reloadPeers(ami) {
	ami.action({'action':'sippeers', 'actionid':'reloadpeers'}, function(err, res) {
		console.log(res);
	});
}










