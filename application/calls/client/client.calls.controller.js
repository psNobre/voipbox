"use strict";

angular.module("app").controller("CallsController", ["$scope", "$rootScope", "$state", "CallsResource", "CallsValues", function($scope, $rootScope, $state, CallsResource, CallsValues){

	var vm = $scope;
	var callsToRemoveList = [];
	vm.calls = [];

	vm.filters = CallsValues.filterBy;
	vm.filterBy = vm.filters[0];
	vm.setFilterBy = function (filter) {
		vm.filterBy = filter;
	}

	$('.ui.dropdown').dropdown();

	$scope.$on('message', onmessage);

	CallsResource.getCalls().then(getCallsSuccess, getCallsFail);

	function getCallsSuccess(response){
		vm.calls = response.data;
	};

	function getCallsFail(){
		alert("getCallsFail");
	};

	function onmessage(e, data){
		var data = JSON.parse(data);
		if (data.hasOwnProperty('callId') && data.hasOwnProperty('peerCaller') && data.hasOwnProperty('peerDestCaller') && data.hasOwnProperty('statusDial')) {
			vm.calls.push(data);
		};
	};

	vm.checkAll = function () {
		if (vm.selectedAllCalls) {
			angular.forEach(vm.calls, calbackMark);
		} else {
			angular.forEach(vm.calls, calbackMark);
		}

		function calbackMark(call) {
			call.selected = vm.selectedAllCalls;
		}
	};

	vm.removeCalls = function  () {
		angular.forEach(vm.calls, function (call) {
			if (call.selected) {
				callsToRemoveList.push(call);
			};
		});

		if (callsToRemoveList.length === 0) {
			alertUserError("Sorry, no selected record.");
		} else {
			CallsResource.rmvCalls(callsToRemoveList).success(function (response) {
				 //Não pode ficar aki
				alertDelCallSuccess(response);
			})
			.error(function (response){
				// $state.reload();
				alertDelCallError(response);

			});
		}
		callsToRemoveList = [];
	}

	// ALERT MODAL DEL
	function alertDelCallError(message) {
		vm.message = message;
		$('#alertDelCallModalError').modal({
			closable  : false,
			onApprove : function() {
				return true;
			}
		})
		.modal('show')
		;
	}

	function alertDelCallSuccess(message) {
		vm.message = message;
		$('#alertDelCallModalSuccess').modal({
			closable  : false,
			onApprove : function() {
				$state.reload();
			}
		})
		.modal('show');
	}

}]);
