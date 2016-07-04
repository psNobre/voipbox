"use strict";

angular.module("app").service("UsersResource", ["$http", function($http){
	
	return{
		addUser: addUser,
		getUsers: getUsers,
		getUser: getUser,
		delUser: delUser,
		updUser: updUser
	}

	function addUser(user){
		return $http.post("/api/adduser", user);
	};

	function getUsers(){
		return $http.get("/api/getusers");
	};

	function getUser (id) {
		return $http.get("api/getuser/" + id);
	}

	function delUser (username) {
		return $http.delete("api/deluser/" + username);
	}

	function updUser(id, user) {
		return $http.put("api/upduser/" + id, user);
	}

}]);