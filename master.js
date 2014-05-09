var http = require('http');
var url = require('url');

var storedIp = '';

var RemoteServer = function()
{
	var _routes = new Array();
	var _server = null;

	this.get = function(expr, callback)
	{
		_routes.push({expr: expr, callback: callback});
	};

	function _checkRoute(req, res) {
		var pathname = url.parse(req.url, true).pathname;
		for (var i in _routes)
			if (_routes[i].expr == pathname)
				return _routes[i].callback(req, res);
		res.end('404');
	}

	this.start = function(port)
	{
		console.log("Starting Remote Server");
		_server = http.createServer(function(req, res) {
			_checkRoute(req, res);
		});
		_server.listen(port);
	}

}

// Configure Remote Server
var remote = new RemoteServer();

remote.get("/set", function(req, res) {

	storedIp = url.parse(req.url, true).query.ip;
	console.log("Set to " + storedIp);
	// var newIp = url.parse(req.url, true).pathname;
	res.writeHead(200, {
		'Access-Control-Allow-Origin': '*',
		'Content-Type': 'text/plain' });
	res.end('1');
});



remote.get("/get", function(req, res) {
	console.log("Get ");

	// var newIp = url.parse(req.url, true).pathname;
	res.writeHead(200, {
		'Access-Control-Allow-Origin': '*',
		'Content-Type': 'text/plain' });
	res.end('http://' + storedIp + ':4242');
});

remote.start(1337);

