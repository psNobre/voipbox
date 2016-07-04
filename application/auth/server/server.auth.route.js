"use strict";

module.exports = function(){	
	var app = this.app;
	var ldapClient = this.ldapClient;
	var ldapConfig = this.config.ldap;

	var authController = require("./server.auth.controller")(ldapClient, ldapConfig);

	app.post("/api/auth", authController.authUser);
	app.get("/api/logout", authController.logoutUser);
	app.get("/api/auth/session", authController.getSession);
};