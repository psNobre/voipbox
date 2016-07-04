"use strict";

var _ = require('lodash');

function Peers(){
	
	var peers = {};

	return {
		get: get,
		set: set,
		del: del,
		clear: clear
	}

	function get(index){
		return index ? peers[index] : _.values(peers);
	};
	
	function set(index, data){
		peers[index] = data;
	};

	function del(index){
		delete peers[index];
	};

	function clear(){
		peers = {};
	};

};

module.exports = new Peers();