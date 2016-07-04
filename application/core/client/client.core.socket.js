"use strict";

angular.module('app').service('socket', ["$rootScope", function($rootScope){

	var ws;

	return {
		open: open,
		close: close
	};

	function close() {
		ws.close();
	}

	function open() {
		var url = window.location.origin.replace(/http/, 'ws');
		
		ws = new WebSocket(url);

		ws.onopen = emitEvent;
		ws.onmessage = emitEvent
		ws.onclose = emitEvent
	}

	function emitEvent(e){
		$rootScope.$apply(function(){
			$rootScope.$broadcast(e.type, e.data);
		});
	};

}]);