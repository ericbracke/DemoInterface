//login.js
var Promise = require('bluebird');
var fs = require('fs');
var request = require('request');
var config = require('../config/config');

var login = 
{
	login: function(userDirectory, userId, attributes)
	{
		return new Promise(function(resolve,reject)
		{
			console.log('running login');
			//  Set our request defaults, ignore unauthorized cert warnings as default QS certs are self-signed.
			//  Export the certificates from your Qlik Sense installation and refer to them
			var r = request.defaults({
			  rejectUnauthorized: false,
			  host: config.hostname,
			  cert: fs.readFileSync(config.certificates.client),
			  key: fs.readFileSync(config.certificates.client_key),
			  ca: fs.readFileSync(config.certificates.root)
			});

			//  Authenticate whatever user you want
			var b = JSON.stringify({
			  "UserDirectory": userDirectory,
			  "UserId": userId,
			  "Attributes": attributes
			});

			console.log(b);
			r.post(
			{
				uri: 'https://' + config.hostname + ':4243/qps/' + (config.virtualProxyPath == null ? '' : config.virtualProxyPath + '/') + 'ticket?xrfkey=abcdefghijklmnop',
				body: b,
				headers:
				{
			   		'x-qlik-xrfkey': 'abcdefghijklmnop',
			    	'content-type': 'application/json'
			  	}
			},
			function(err, res, body) 
			{
				//  Consume ticket, set cookie response in our upgrade header against the proxy.
		  		var ticket = JSON.parse(body)['Ticket'];
		  		if(err)
		  		{
		  			console.log(err);
		  			reject(err);
		  		}
		  		else
		  		{
		  			console.log(ticket);
		  			resolve(ticket);
		  		}
		  	});			
		});
	}
};

module.exports = login;