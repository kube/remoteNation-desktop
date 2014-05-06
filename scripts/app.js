var fs = require('fs');
var http = require('http');
var url = require('url');

var authKey = null;

// Go to login page by default
$(document).ready(function() {
	pageRenderer = new (require('./scripts/PageRenderer.js'))(document);
	pageRenderer.login();
});


function submitLogin()
{
	var identity = $('#identityField').val();
	var password = $('#passwordField').val();

	$.post('https://api.streamnation.com/api/v1/auth',
		{
			identity: identity,
			password: password
		},
		function(data) {

			authKey = data.auth_token;
			pageRenderer.setCredentials(authKey);
			pageRenderer.home();

		}).fail(function(a){
			$('#message').text('Failed Identification');
		});
}


// Lib
var routes = new Array();

get = function(expr, callback)
{
	routes.push({expr: expr, callback: callback});
};

checkRoute = function(req, res)
{
	var pathname = url.parse(req.url, true).pathname;

	for (var i in routes)
	{
		if (routes[i].expr == pathname)
			return routes[i].callback(req, res);
	}
	res.end('404');
}

// Add Routes
get("/play", function(req, res) {
	console.log("Playing");
	alert("Playing");
	res.end("Playing");
});

get("/pause", function(req, res) {
	console.log("Paused");
	alert("Paused");
	res.end("Paused");
});


// Remote Server
var server = http.createServer(function(req, res) {

	checkRoute(req, res);

}).listen(4242);
