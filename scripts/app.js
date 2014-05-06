var fs = require('fs');
var http = require('http');
var url = require('url');
var path = require('path');
var flashTrust = require('nw-flash-trust');

var authKey = null;

// Go to login page by default
$(document).ready(function() {
	pageRenderer = new (require('./scripts/PageRenderer.js'))(document);
	pageRenderer.login();
});




// appName could be any globally unique string containing only
// big and small letters, numbers and chars "-._"
// It specifies name of file where trusted paths will be stored.
// Best practice is to feed it with "name" value from your package.json file.
var appName = 'myApp';

try {
    // Initialization and parsing config file for given appName (if already exists).
    var trustManager = flashTrust.initSync(appName);
} catch(err) {
	throw err;
    if (err.message === 'Flash Player config folder not found.') {
        // Directory needed to do the work doesn't exist.
        // Probably Flash Player is not installed, there is nothing I can do.
    }
}

// adds given filepath to trusted locations
// paths must be absolute
trustManager.add(path.resolve('./scripts/', 'Player.swf'));

// whole folders are also allowed
// trustManager.add(path.resolve('./scripts/', 'folder'));

// removes given path from trusted locations
// trustManager.remove(path.resolve('./scripts/', 'Player.swf'));

// returns true or false whether given path is trusted or not
isTrusted = trustManager.isTrusted(path.resolve('./scripts/', 'Player.swf'));
console.log(isTrusted);

// returns array containing all trusted paths
var list = trustManager.list();
console.log(list);

// removes all trusted locations from config file
// trustManager.empty();



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
