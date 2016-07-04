"use strict";

angular.module("app").service("PeersResource", ["$http", function($http){
	
	return{
		get: getPeers,
		addPeer: addPeer,
		delPeer: delPeer
	}

	function getPeers(){
		return $http.get("/api/peers");
	};
	
	function addPeer(peer){
		return $http.post("/api/addPeer", peer);
	};

	function delPeer(objectname){
		return $http.delete("/api/delPeer/" + objectname);
	};

}]);