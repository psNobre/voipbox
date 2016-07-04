"use strict";

var authService = require("./server.auth.service");

module.exports = function(ldapClient, ldapConfig){

	return{
		authUser: authUser,
		logoutUser: logoutUser,
		getSession: getSession,
	};

	function authUser(req, res){
		var user = req.body;
		
		authService.authUser(user.name, user.password, function (err, isMatch, userDb) {
			if (err || !isMatch){ 

				if (ldapConfig.active) {
					authService.authLdap(user.name, user.password, ldapClient, ldapConfig, function (err, isMatch, userLdap) {
						if (err || !isMatch){ 
							return res.status(404).end("User Not Auth!");
						}

						req.session.user = userLdap;
						res.json(userLdap);
					});

				}

				else{
					return res.status(404).end("User Not Auth!");
				}

			} else {
				req.session.user = userDb;
				res.json(userDb);
			}

		});
	}

	function logoutUser(req, res){
		var userSession = req.session.user;

		if (userSession === undefined) {
			return res.status(404).end("User Already Null!");
		};

		delete req.session.user;
		res.json(req.session.user);

	}

	function getSession(req, res) {
		var userSession = req.session.user;

		if (userSession === undefined) {
			return res.status(404).end("Session Expired");
		};

		res.json(userSession);

	}

}



