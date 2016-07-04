// IFFE
(function(){
	'use strict';

	angular.module('app').controller('CoreController', ['$scope', '$rootScope', 'socket' ,'$state', 'AuthResource', CoreController]);

	function CoreController($scope, $rootScope, socket, $state, AuthResource){

		var vm = $scope;
		vm.apresentation = 'Angular - Single page application';

		socket.open();

		$rootScope.isStandartUser = function (userType) {
			if (userType !== "standard") {
				return false;
			}
			return true;
		}

		$rootScope.logout = function () {
			AuthResource.logoutUser().then(onSuccess, onError);

			function onSuccess(response) {
				socket.close();
				$state.go('auth');
			}

			function onError(response){
				console.log(response);
				alert(response);
			}
		}

		// $scope.$on('$destroy', onDestroy);

		// function onDestroy (argument) {
		// 	socket.close();
		// }

	}

})();
