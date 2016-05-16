//router.js
//
//

var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var parseUrlencoded = bodyParser.urlencoded({extended: false});
var path = require('path');
var login = require('../lib/login');
var config = require('../config/config');



router.use(function(req,res,next){
	console.log('Something is happening.');
	next();
});

router.route('/')
	.get(function(request, response)
	{
		response.sendFile('index.html', { root: path.join(__dirname, '../')}, function(err)
		{
			if(err)
			{
				console.log(err);
				response.status(err.status).end();
			}
			else
			{
				console.log('sent index.html');
			}
		});
		
	});

router.route('/:page')
	.get(function(request, response)
	{
		var page;
		 if(request.params.page ==null)
		 {
		 	page = 'index';
		 }
		 else
		 {
		 	page = request.params.page;
		 }
		response.sendFile( page + '.html', { root: path.join(__dirname, '../')}, function(err)
		{
			if(err)
			{
				console.log(err);
				response.status(err.status).end();
			}
			else
			{
				console.log('sent index.html');
			}
		});
		
	});

router.route('/login/:destination')
	.post(parseUrlencoded, function(request, response)
	{
		console.log('Body');
		console.log(request.body);
		var destination;
		if(request.params.destination==null)
		{
			destination='hub';
		}
    else if (request.params.destination=='pinit') {
      destination = 'resources/pinit/index.html';
    }
		else
		{
			destination = request.params.destination;
		}
		console.log(request.body.userId);

		login.login(config.userDomain,request.body.userId,[])
		.then(function(ticket)
		{
			console.log('ticket: ' + ticket);
			var redirectUri = 'https://' + config.hostname + '/' + destination + '?Qlikticket=' + ticket;
			if (config.virtualProxyPath != null) {
				redirectUri = 'https://' + config.hostname + '/' + config.virtualProxyPath + '/' + destination + '?Qlikticket=' + ticket;
			}
			console.log(redirectUri);
			response.send(redirectUri);
		})
		.catch(function(error)
		{
			response.send('Login failed because of: ' + error);
		});  
	});

module.exports = router;