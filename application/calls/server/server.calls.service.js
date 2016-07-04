var calls = require('./server.calls.model');
var colors = require('colors');
var util = require('util');
var mongoose = require('mongoose');
var Call = mongoose.model('Call');

module.exports = function(){
	var ami = this.ami;
	var ws = this.ws;

	ami.on('dialbegin', function(data) {
		util.log(util.format('Peer %s is calling %s - Id de chamada: %s', data.calleridnum, data.dialstring, data.destuniqueid));

		var id = data.destuniqueid;
		var call = buildCall(id);

		call.dialbegin = data;
		calls.set(id, call);

	});

	ami.on('dialend', function(data) {
		var id = data.destuniqueid;
		var call = calls.get(id) || {};

		call.dialend = data;

		if(data.dialstatus === "BUSY"){
			call.dataMillsBegin = Date.now();
			call.dataMillsEnd = Date.now();

			var mCall = new Call();		

			console.log(call);	

			mCall.callId = call._id;
			mCall.peerCaller = call.dialbegin.calleridnum;
			mCall.peerDestCaller = call.dialbegin.destcalleridnum;
			mCall.statusDial = call.dialend.dialstatus;
			mCall.timeMillsDialBegin = call.dataMillsBegin;
			mCall.timeMillsDialEnd = call.dataMillsEnd;

			//Envia Alteração 
			ws.clients.forEach(function(client){
				client.send(JSON.stringify(mCall));
			});
			
			//Persistir CALL
			mCall.save(function (err) {
				if (err){
					return util.log(colors.red("Add Error on MongoDB"));
				} 
				util.log(colors.cyan("Call Added on MongoDB"));
			});
		};

		call.dataMillsBegin = Date.now();

		calls.set(id, call);

		util.log(util.format('Peer %s are %s- Id de chamada: %s', data.destcalleridnum, data.dialstatus, data.destuniqueid));
	});

	ami.on('hangup', function(data) {
		if (data['cause-txt'] === "Normal Clearing") {
			var id = data.uniqueid;
			var call = calls.get(id) || {};

			if (call._id === data.uniqueid) {
				call.hangup = data;
				call.dataMillsEnd = Date.now();

				var mCall = new Call();			
				mCall.callId = call._id;
				mCall.peerCaller = call.dialbegin.calleridnum;
				mCall.peerDestCaller = call.dialbegin.destcalleridnum;
				mCall.statusDial = call.dialend.dialstatus;
				mCall.timeMillsDialBegin = call.dataMillsBegin;
				mCall.timeMillsDialEnd = call.dataMillsEnd;

				ws.clients.forEach(function(client){
					client.send(JSON.stringify(mCall));
				});

				mCall.save(function (err) {
					if (err){
						return util.log(colors.red("Add Error on MongoDB"));
					} 
					util.log(colors.cyan("Call Added on MongoDB"));
				});

				calls.set(id, call);
				util.log(util.format('Peer %s hangup - Id de chamada: %s', data.calleridnum, data.uniqueid));
			};
		}
	});

	function buildCall(id) {
		return {
			_id: id,
			dialbegin: null, 
			dialend: null,
			hangup: null,
			dataMillsBegin: null,
			dataMillsEnd: null
		}
	}
}