var http = require('http');
var url = require('url');

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

module.exports = RemoteServer;
