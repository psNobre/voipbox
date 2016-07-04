"use strict";

angular.module("app").controller("AuthController", ["$scope", "$rootScope","$state", "socket", "AuthResource", function($scope, $rootScope, $state, socket, AuthResource){

	var vm = $scope;

	vm.login = function (user) {

		AuthResource.authUser(user).success(function (response) {
			$scope.loginForm.$setPristine();
			$state.go('core.dashboard');
		})
		.error(function (response){
			console.log(response);
			alert(response);

		});
		
	}

}]);