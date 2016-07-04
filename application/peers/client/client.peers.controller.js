"use strict";

angular.module("app").controller("PeersController", ["$scope", "$rootScope", "$state", "PeersResource", "PeersValues", function($scope, $rootScope, $state, PeersResource, PeersValues){

	var vm = $scope;
	vm.peers = [];
	
	vm.orderBy = 'objectname';
	vm.astContext = PeersValues.astContext;
	vm.astType = PeersValues.astType;

	vm.filters = PeersValues.filterBy;
	vm.filterBy = vm.filters[0];
	vm.setFilterBy = function (filter) {
		vm.filterBy = filter;
	}

	$('.ui.dropdown').dropdown();

	$scope.$on('message', onmessage);
	function onmessage(e, data){
		var data = JSON.parse(data);
		vm.peers.forEach(function(peer, index){
			if(peer.objectname == data.objectname){
				vm.peers[index] = data;
			}
		});
	};

	PeersResource.get().then(getPeersSuccess, getPeersFail);

	function getPeersSuccess(response){
		vm.peers = response.data;
	};

	function getPeersFail(){
		alert("getPeersFail");
	};

	vm.addPeer = function (candidate){
		vm.addPeerForm.$setPristine();
		PeersResource.addPeer(candidate).success(function (response) {
			$state.go("core.peers.list");
			alertAddPeerSuccess(response);
		})
		.error(function (response){
			alertAddPeerError(response);

		});
		delete vm.candidate;
	}

	vm.deletePeer = function (objectname) {
		PeersResource.delPeer(objectname).success(function (response) {
			PeersResource.get().then(getPeersSuccess, getPeersFail);
			alertDelPeerSuccess(response);
		})
		.error(function (response){
			alertDelPeerError(response);

		});
	}


	// ALERT MODAL ADD
	function alertAddPeerError(message) {
		vm.message = message;
		$('#alertAddPeerModalError').modal({
			closable  : false,
			onDeny    : function(){
				$state.go("core.peers.list");
			},
			onApprove : function() {
				return true;
			}
		})
		.modal('show')
		;
	}

	function alertAddPeerSuccess(message) {
		vm.message = message;
		$('#alertAddPeerModalSuccess').modal({
			closable  : false,
			onDeny    : function(){
				$state.go("core.peers.list");
			},
			onApprove : function() {
				return true;
			}
		})
		.modal('show');
	}

	// ALERT MODAL DEL
	function alertDelPeerError(message) {
		vm.message = message;
		$('#alertDelPeerModalError').modal({
			closable  : false,
			onApprove : function() {
				return true;
			}
		})
		.modal('show')
		;
	}

	function alertDelPeerSuccess(message) {
		vm.message = message;
		$('#alertDelPeerModalSuccess').modal({
			closable  : false,
			onApprove : function() {
				return true;
			}
		})
		.modal('show');
	}

}]);
