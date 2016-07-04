"use strict";

angular.module("app").controller("DashboardController", ["$scope", "$rootScope", "$state", "DashboardResource", "PeersResource", "CallsResource", function($scope, $rootScope, $state, DashboardResource, PeersResource, CallsResource){

	var vm = $scope;
	vm.peers = [];
	vm.calls = [];

	PeersResource.get().then(getPeersSuccess, getPeersFail);

	function getPeersSuccess(response){
		vm.peers = response.data;
		drawChartPeers();
	};

	function getPeersFail(){
		alert("getPeersFail");
	};

	CallsResource.getCalls().then(getCallsSuccess, getCallsFail);

	function getCallsSuccess(response){
		vm.calls = response.data;
		drawChartCalls();
	};

	function getCallsFail(){
		alert("getCallsFail");
	};

	$scope.$on('message', onmessage);

	function onmessage(e, data){
		var data = JSON.parse(data);
		if (data.event == "PeerEntry") {
			vm.peers.forEach(function(peer, index){
				if(peer.objectname == data.objectname)
					vm.peers[index] = data;
			});
			drawChartPeers();
		};

		if (data.hasOwnProperty('callId') && data.hasOwnProperty('peerCaller') && data.hasOwnProperty('peerDestCaller') && data.hasOwnProperty('statusDial')) {
			vm.calls.push(data);
			drawChartCalls();
		};

	};

	function drawChartPeers() {
		var registered = vm.peers.filter(function(peer) {return peer.status == "Registered";});
		var reachable = vm.peers.filter(function(peer) {return peer.status == "Reachable";});
		var unregistered = vm.peers.filter(function(peer) {return peer.status == "Unregistered";});
		var unreachable = vm.peers.filter(function(peer) {return peer.status == "Unreachable";});
		var unknown = vm.peers.filter(function(peer) {return peer.status == "Unknown";});
		var unmonitored = vm.peers.filter(function(peer) {return peer.status == "Unmonitored";});

		vm.chartObject = {};
		vm.chartObject.type = 'PieChart';
		vm.chartObject.options = {
			colors: ['#81C784','#66BB6A', '#e57373', '#ef5350', '#FFE082', '#A1887F'],
			pieHole: 0.4,
			height: 300,
			width: 300,
			chartArea: { 
				left: 30, 
				top: 30, 
				width: '100%', 
				height: '100%'
			},
		};

		vm.chartObject.data = [
		['Component', 'Quantidade'],
		['Registered', registered.length],
		['Reachable', reachable.length],
		['Unregistered', unregistered.length],
		['Unreachable', unreachable.length],
		['Unknown', unknown.length],
		['Unmonitored', unmonitored.length],
		];
	}


	function drawChartCalls() {
		var answer = vm.calls.filter(function(call) {return call.statusDial == "ANSWER";});
		var noanswer = vm.calls.filter(function(call) {return call.statusDial == "NOANSWER";});
		var cancel = vm.calls.filter(function(call) {return call.statusDial == "CANCEL";});
		var busy = vm.calls.filter(function(call) {return call.statusDial == "BUSY";});

		vm.qtdCallsByMonth = {};
		vm.qtdCallsByMonth.type = 'ColumnChart';
		vm.qtdCallsByMonth.options = {
			colors: ['#64B5F6'],
			height: 400,
			width: 600,
			chartArea: { 
				left: 30, 
				top: 30, 
				width: '100%', 
				height: '100%'
			},
		};

		vm.qtdCallsByMonth.data = [
		['Status', 'Quantidade'],
		['ANSWER', answer.length],
		['NO ANSWER', noanswer.length],
		['CANCEL', cancel.length],
		['BUSY', busy.length]

		];

	}



}]);
