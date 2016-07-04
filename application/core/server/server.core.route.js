"use strict";

module.exports = function(){
	var app = this.app;

	app.get("/", function(req, res){
		res.render("core/server/views/server.core.html");
	});
};