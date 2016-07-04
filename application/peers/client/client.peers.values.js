'use strict';

angular.module('app').value('PeersValues', {
	
	filterBy: [
		{category: 'All', value: '', forced: false, circleColor: 'grey'},
		{category: 'Registered', value: 'Registered', forced: true, circleColor: 'green'},
		{category: 'Reachable', value: 'Reachable', forced: true, circleColor: 'green'},
		{category: 'Unreachable', value: 'Unreachable', forced: true, circleColor: 'red'},
		{category: 'Unregistered', value: 'Unregistered', forced: true, circleColor: 'red'},
		{category: 'Unknown', value: 'Unknown', forced: true, circleColor: 'orange'}],

	astType : [
		'friend', 
		'user', 
		'peer'],

	astContext : [
		'default',
		'fixo-quixada', 
		'fixo-fortaleza', 
		'ramal-sip', 
		'ramal-fixo', 
		'fora-ufc-qx', 
		'e-tecnico', 
		'e-professor', 
		'e-aluno', 
		'e-admin', 
		'e-rede-publica', 
		'e-ramal-fisico', 
		'e-fora-ufc-qx']
});
