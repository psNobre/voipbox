"use strict";

module.exports = function(){	
	var app = this.app;
	var ldapClient = this.ldapClient;
	var ldapConfig = this.config.ldap;

	var usersController = require("./server.users.controller")();
	
	app.post("/api/adduser", usersController.addUser);
	app.get("/api/getusers", usersController.getUsers);
	app.get("/api/getuser/:id", usersController.getUser);
	app.delete("/api/deluser/:username", usersController.delUser);
	app.put("/api/upduser/:id", usersController.updUser);
};