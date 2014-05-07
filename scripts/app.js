var RemoteServer = require('./scripts/RemoteServer.js');
var authKey = null;
var url = require('url');

console.log("Starting Player");


// Configure Remote Server
var remote = new RemoteServer();

remote.get("/play", function(req, res) {
	console.log("Playing");
	res.writeHead(200, {
		'Access-Control-Allow-Origin': '*',
		'Content-Type': 'text/plain' });
	res.end("Playing");
});

remote.get("/pause", function(req, res) {
	console.log("Paused");
	res.writeHead(200, {
		'Access-Control-Allow-Origin': '*',
		'Content-Type': 'text/plain' });
	res.end("Paused");
});

remote.get("/refresh", function(req, res) {
	console.log("refresh");
	res.writeHead(200, {
		'Access-Control-Allow-Origin': '*',
		'Content-Type': 'text/plain' });
	setTimeout(function() {
		res.end("Refresh");
	}, 2000);
});

remote.get("/seek", function(req, res) {
	console.log("seek");
	var position = url.parse(req.url, true).query.s;
	console.log(position);
	res.writeHead(200, {
		'Access-Control-Allow-Origin': '*',
		'Content-Type': 'text/plain' });
	res.end("Seek at " + position + "%");
});

remote.start(4242);

// Load PageRenderer
$(document).ready(function() {
	pageRenderer = new (require('./scripts/PageRenderer.js'))(window, document, remote);
	pageRenderer.login();
});
