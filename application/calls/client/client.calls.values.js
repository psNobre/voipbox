'use strict';

angular.module('app').value('CallsValues', {
	filterBy : [{category: 'All', value: '', forced: false, circleColor: 'grey'},
		{category: 'Answer', value: 'ANSWER', forced: true, circleColor: 'green'},
		{category: 'No Answer', value: 'NOANSWER', forced: true, circleColor: 'red'},
		{category: 'Cancel', value: 'CANCEL', forced: true, circleColor: 'red'},
		{category: 'Busy', value: 'BUSY', forced: true, circleColor: 'orange'}]
});
