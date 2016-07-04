"use strict";

var mongoose = require('mongoose');


var Schema = mongoose.Schema;

var CallSchema = new Schema({
	callId: { type: String, required: true, index: { unique: true } },
	peerCaller: { type: String, required: true },
	peerDestCaller: { type: String, required: true },
	statusDial: { type: String, required: true },
	timeMillsDialBegin: { type: String, required: true },
	timeMillsDialEnd: { type: String, required: true }
});

mongoose.model('Call', CallSchema);