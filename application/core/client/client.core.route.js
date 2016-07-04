"use strict";

angular.module('app').config(function($stateProvider, $urlRouterProvider){

	$urlRouterProvider.otherwise('/auth');

	$stateProvider
	.state('auth', {
		url: '/auth',
		controller: 'AuthController',
		templateUrl: '/application/auth/client/views/client.auth.html'
	})
	.state('core', {
		url: '/core',
		controller: 'CoreController',
		templateUrl: '/application/core/client/views/client.core.html',
		resolve : {
			authenticate: ["$q", "$state", "$rootScope", "AuthResource", authenticate]
		}
	})
	.state('core.dashboard', {
		url: '/dashboard',
		controller: 'DashboardController',
		templateUrl: '/application/dashboard/client/views/client.dashboard.html'
	})
	.state('core.peers', {
		url: '/peers',
		controller: 'PeersController',
		templateUrl: '/application/peers/client/views/client.peers.html'
	})
	.state('core.peers.list', {
		url: '/list',
		controller: 'PeersController',
		templateUrl: '/application/peers/client/views/client.peerslist.html'
	})
	.state('core.peers.add', {
		url: '/add',
		controller: 'PeersController',
		templateUrl: '/application/peers/client/views/client.peersadd.html'
	})
	.state('core.calls', {
		url: '/calls',
		controller: 'CallsController',
		templateUrl: '/application/calls/client/views/client.calls.html'
	})
	.state('core.users', {
		url: '/users',
		controller: 'UsersController',
		templateUrl: '/application/users/client/views/client.users.html'
	})
	.state('core.users.list', {
		url: '/list',
		controller: 'UsersController',
		templateUrl: '/application/users/client/views/client.userslist.html'
	})
	.state('core.users.add', {
		url: '/add',
		controller: 'UsersController',
		templateUrl: '/application/users/client/views/client.usersadd.html'
	})
	.state('core.users.upd', {
		url: '/upd',
		params: { 
			edtUser: 'defaultValue'
		},
		controller: 'UsersController',
		templateUrl: '/application/users/client/views/client.usersupd.html'
	});

	function authenticate ($q, $state, $rootScope, AuthResource) {
		var defer = $q.defer();
		AuthResource.getSession()
		.success(function (response) {
			$rootScope.userType = response.type;
			defer.resolve();
		}).error(function (response) {
			alert(response);
			defer.reject();
			$state.go("auth");
		});

		return defer.promise;
	}

});

