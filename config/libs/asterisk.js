
var AsteriskAmi = require('asterisk-manager');
var colors = require('colors');
var util = require('util');

module.exports.init = function init(config){

	var amiConfig = config.asterisk;
	var ami = new AsteriskAmi(amiConfig.port, amiConfig.host, amiConfig.username, amiConfig.password, amiConfig.events);

	ami.keepConnected();

	ami.on('connect', function (response) {
		util.log(colors.green(util.format('Asterisk Server connected on (%s:%d)', amiConfig.host, amiConfig.port)));
	});

	return ami;
};