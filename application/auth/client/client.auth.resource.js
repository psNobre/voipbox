"use strict";

angular.module("app").service("AuthResource", ["$http", function($http){
	
	return{
		authUser: authUser,
		logoutUser: logoutUser,
		getSession: getSession
	}

	function authUser(user){
		return $http.post("/api/auth", user);
	};

	function logoutUser(){
		return $http.get("/api/logout");
	};

	function getSession() {
		return $http.get("/api/auth/session");
	};

}]);