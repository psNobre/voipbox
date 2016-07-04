"use strict";
var colors = require('colors');
var util = require('util');
var mongoose = require('mongoose');
var User = mongoose.model('User');

exports.authLdap = authLdap;
exports.authUser = authUser;

function authLdap(username, password, ldapClient, ldapConfig, cb) {

	var dn = util.format("uid=%s,%s", username, ldapConfig.userLdap.bindSufix);

	//Autenticação com Usuário
	ldapClient.bind(dn, password, function(err) {
		if (err === null) {
			util.log(colors.cyan("User Found on LDAP"));

			//Busca de Autorização para o Usuário na Base LDAP
			if (ldapConfig.authList.active) {
				authorize(username, password, ldapClient, ldapConfig, function (done, userLdap) {
					if (done && userLdap == null) {
						cb(true, false, null);
						util.log(colors.red("No User Authorized on LDAP"));
					}else if (done && userLdap != null) {
						cb(false, true, userLdap);
						util.log(colors.cyan("User Authorized on LDAP"));
					};

				});

			}else{
				cb(false, true, {username: username, type: ldapConfig.authList.powerAuthority});
			};


		}else if (err !== null){
			util.log(colors.red("User Not Found on LDAP"));
			cb(true, false, null);

		}
	});


	function authorize(username, password, ldapClient, ldapConfig, callback){

		var mUser;

		var opts = {
			filter: '(&(uid='+ username +')(memberof='+ ldapConfig.authList.memberFilter +'))',
			scope: 'sub',
			attributes: ['uid','userPassword']
		};

		ldapClient.bind(ldapConfig.baseLdap.bindSufix, ldapConfig.baseLdap.password, function(err) {
			ldapClient.search(ldapConfig.dc, opts, function (err, search) {
				search.on('searchEntry', function (res) {
					mUser = {username: res.object.uid , password: res.object.userPassword, type: ldapConfig.authList.powerAuthority};
				});

				search.on('end', function (res) {
					callback(true, mUser);
				});

			});

		});

	}

};

function authUser(username, password, cb){

	User.findOne({username: username}, function(err, user) {
		if (err){
			cb(true);
			return util.log(colors.red("Error on MongoDB"));
		}

		if(user === null){
			cb(true);
			return util.log(colors.red("User Not Found on Mongo DB"));
		}

		if(password === null){
			cb(true);
			return util.log(colors.red("Password is null"));
		}

		util.log(colors.cyan("User on MongoDB"));

		user.comparePassword(password, function(err, isMatch) {
			cb(err, isMatch, user);
		});

	});

};

