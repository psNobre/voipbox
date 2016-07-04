"use strict";

angular.module("app").controller("UsersController", ["$scope", "$rootScope","$state", "$stateParams", "UsersResource", "UsersValues", function($scope, $rootScope, $state, $stateParams, UsersResource, UsersValues){

	var vm = $scope;
	vm.users = [];
	vm.userTypes = UsersValues.userTypes;

	// Filter Init
	vm.filters = UsersValues.filterBy;
	vm.filterBy = vm.filters[0];
	vm.setFilterBy = function (filter) {
		vm.filterBy = filter;
	}

	if ($stateParams.edtUser != undefined) {
		vm.candidate = $stateParams.edtUser; 
	};

	$('.ui.dropdown').dropdown();

	UsersResource.getUsers().then(getUsersSuccess, getUsersFail);

	function getUsersSuccess(response){
		vm.users = response.data;
	};
	function getUsersFail(){
		alertUserError("getUsersFail");
	};
	
	vm.addUser = function (candidate) {
		
		vm.addUserForm.$setPristine();

		if (candidate.password !== candidate.confirmPassword)
			return alertAddUserError("Passwords are different!");

		UsersResource.addUser(candidate).success(function (response) {
			alertAddUserSuccess(response);
		})
		.error(function (response){
			alertAddUserError(response);

		});

		delete vm.candidate;
	}

	vm.deleteUser = function(user) {
		UsersResource.delUser(user.username).success(function (response) {
			var index = vm.users.indexOf(user);
			delete vm.users[index];
			alertDelUserSuccess(response);
		})
		.error(function (response){
			alertDelUserError(response);
		});
	}

	vm.updUser = function (user) {
		UsersResource.updUser(user._id, user).success(function (response) {
			alertUpdUserSuccess(response);
		})
		.error(function (response){
			alertUpdUserError(response);
		});
	}

	// ALERT MODAL ADD
	function alertAddUserError(message) {
		vm.message = message;
		$('#alertAddUserModalError').modal({
			closable  : false,
			onDeny    : function(){
				$state.go("core.users.list");
			},
			onApprove : function() {
				return true;
			}
		})
		.modal('show')
		;
	}

	function alertAddUserSuccess(message) {
		vm.message = message;
		$('#alertAddUserModalSuccess').modal({
			closable  : false,
			onDeny    : function(){
				$state.go("core.users.list");
			},
			onApprove : function() {
				return true;
			}
		})
		.modal('show');
	}
	// ALERT MODAL UPD
	function alertUpdUserError(message) {
		vm.message = message;
		$('#alertUpdUserModalError').modal({
			closable  : false,
			onApprove : function() {
				$state.go("core.users.list");
			}
		})
		.modal('show')
		;
	}

	function alertUpdUserSuccess(message) {
		vm.message = message;
		$('#alertUpdUserModalSuccess').modal({
			closable  : false,
			onApprove : function() {
				$state.go("core.users.list");
			}
		})
		.modal('show');
	}
	// ALERT MODAL DEL
	function alertDelUserError(message) {
		vm.message = message;
		$('#alertDelUserModalError').modal({
			closable  : false,
			onApprove : function() {
				return true;
			}
		})
		.modal('show')
		;
	}

	function alertDelUserSuccess(message) {
		vm.message = message;
		$('#alertDelUserModalSuccess').modal({
			closable  : false,
			onApprove : function() {
				return true;
			}
		})
		.modal('show');
	}

}]);