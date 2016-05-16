//config.js
var path = require('path');
var extend = require('extend');

//For production


//var certPath = 'C:/masterlib/certs';

var certPath = 'C:/ProgramData/Qlik/Sense/Repository/Exported Certificates/.Local Certificates';
var routePath = path.join(__dirname, 'server/routes/');
var publicPath = path.join(__dirname, 'public/');

var config = extend(true, {
	port: 81,
	hostname: 'qlikserver',
	virtualProxyPath: 'webticket',
	userDomain: 'QLIKSERVER',
	certificates: {
		client: path.resolve(certPath, 'client.pem'),
		client_key: path.resolve(certPath,'client_key.pem'),
		server: path.resolve(certPath, 'server.pem'),
		server_key: path.resolve(certPath, 'server_key.pem'),
		root: path.resolve(certPath,'root.pem')
	}
});

module.exports = config;