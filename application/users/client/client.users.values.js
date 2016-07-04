'use strict';

angular.module('app').value('UsersValues', {
	filterBy : [
		{category: 'All', value: '', forced: false, circleColor: 'grey'},
		{category: 'Administrator', value: 'administrator', forced: true, circleColor: 'yellow'},
		{category: 'Standard', value: 'standard', forced: true, circleColor: 'brown'}],

	userTypes : [
		'administrator', 
		'standard']
	
});
