"use strict";

angular.module("app").service("CallsResource", ["$http", function($http){
	
	return{
		getCalls: getCalls,
		rmvCalls : rmvCalls
	}

	function getCalls(){
		return $http.get("/api/calls");
	};

	function rmvCalls(calls) {
		return $http.post("/api/rmvcalls", calls);
	}

}]);