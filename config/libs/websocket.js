var colors = require('colors');
var util = require('util');
var WebSocket = require('ws').Server;

module.exports.init = function init(server) {

	var ws = new WebSocket({server:server});

	ws.on('connection', function (client) { 
		util.log(colors.cyan("WebSocket Connected"));

		client.on('close', function() {
			util.log(colors.red("Socket Closed"));
		});
	});

	return ws;
	
}