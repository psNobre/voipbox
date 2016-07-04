
var ldapjs = require('ldapjs');
var util = require('util');
var colors = require('colors');

module.exports.init = function init(config){
	
	var client = ldapjs.createClient({
        url: config.ldap.url,
        connectTimeout: 5000
    });

    util.log(colors.green("Client LDAP Created."));

    return client;

};