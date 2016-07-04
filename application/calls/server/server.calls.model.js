"use strict";

var _ = require('lodash');

function Calls() {

	var calls = {};

	return {
		get: get,
		set: set,
		del: del
	}

	function get(index){
		return index ? calls[index] : _.values(calls);
	};
	
	function set(index, data){
		calls[index] = data;
	};

	function del(index){
		delete calls[index];
	};

}

module.exports = new Calls();