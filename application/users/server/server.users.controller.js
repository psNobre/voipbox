"use strict";

var usersService = require("./server.users.service");
var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports = function(){

	return{
		addUser: addUser,
		getUsers: getUsers,
		getUser: getUser,
		delUser: delUser,
		updUser: updUser
	};

	function addUser(req, res){
		var user = req.body;

		usersService.addUser(user.username, user.password, user.type, function (err) {
			if (err){ 
				return res.status(404).end("For some reason the user can not be added, check if something is wrong in your form.");
			}
			else {
				res.json("The user was successfully added, you can already use it to login.");
			}	
		});

	}

	function getUsers(req, res) {
		User.find({}, function (err, users) {
			res.json(users);
		});
	}

	function getUser(req, res) {
		var id = req.params.id;
		console.log(id);

	}

	function delUser(req, res) {
		var username = req.params.username;
		User.remove({ username: username}, function(err) {
			if (err) {
				return res.status(404).end("Problems to delete the user, check your connection to the database.");
			}
			else {
				res.json("The user was deleted successfully.");
			}
		});
	}

	function updUser(req, res) {
		var id = req.params.id;
		var user = req.body;

		User.findByIdAndUpdate(id, { $set: {username: user.username, type: user.type }}, function (err, user) {
			if (err){
				return res.status(404).end("Problems to edit the user, check your connection to the database.");
			}
			else {
				res.json("The user was edited successfully.");
			}
		});
	}

}



