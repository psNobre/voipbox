"use strict";
var colors = require('colors');
var util = require('util');
var mongoose = require('mongoose');
var User = mongoose.model('User');

exports.addUser = addUser;

function addUser(username, password, type, cb){

	var user = new User();

	user.username = username;
	user.password = password;
	user.type = type;

	user.save(function (err) {
		if (err){
			cb(true);
			return util.log(colors.red("Add Error on MongoDB"));
		} 

		util.log(colors.cyan("User Added on MongoDB"));
		cb(false);
	});

};
