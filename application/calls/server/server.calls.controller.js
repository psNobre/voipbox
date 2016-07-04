"use strict";

var colors = require('colors');
var mongoose = require('mongoose');
var Call = mongoose.model('Call');

exports.getCalls = getCalls;
exports.rmvCalls = rmvCalls;

function getCalls(req, res){
	Call.find({}, function (err, calls) {
        res.json(calls);
    });
};

function rmvCalls(req, res){
	var calls = req.body;
	Call.remove({_id: {$in: calls}}, function(err){
		if (err) {
			return res.status(404).end("Something wrong happened to delete call records, try again.");
		}
		res.json("The call records were deleted successfully.");

	});
};








	