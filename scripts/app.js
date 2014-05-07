var RemoteServer = require('./scripts/RemoteServer.js');
var authKey = null;

console.log("Starting Player");

// Load PageRenderer
$(document).ready(function() {
	pageRenderer = new (require('./scripts/PageRenderer.js'))(document);
	pageRenderer.login();
});

// Configure Remote Server
var remote = new RemoteServer(4242);
remote.start();

remote.get("/play", function(req, res) {
	console.log("Playing");
	alert("Playing");
	res.end("Playing");
});

remote.get("/pause", function(req, res) {
	console.log("Paused");
	alert("Paused");
	res.end("Paused");
});
