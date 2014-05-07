var RemoteServer = require('./scripts/RemoteServer.js');
var authKey = null;
var url = require('url');

console.log("Starting Player");

// Store current IP Adress
var os = require('os');
var ifaces = os.networkInterfaces();
for (var dev in ifaces) {
  var alias = 0;
  ifaces[dev].forEach(function(details){
    if (details.family=='IPv4') {
      // console.log(dev+(alias?':'+alias:''),details.address);
      if (details.adress != '127.0.0.1')
      {
      	// console.log(details.adress);
	      console.log(details.adress)

      }
      ++alias;
    }
  });
}

// Configure Remote Server
var remote = new RemoteServer();

remote.get("/play", function(req, res) {
	console.log("Playing");
	res.writeHead(200, {
		'Access-Control-Allow-Origin': '*',
		'Content-Type': 'text/plain' });
	res.end("Playing");

	var id = url.parse(req.url, true).query.id;

	if (!player || (id && document.getElementById('playerContainer').movieId != id))
		pageRenderer.moviePlayback(id);
	else if (document.getElementById('playerContainer'))
	{
		var player = document.getElementById('playerContainer').contentWindow.document.getElementById('player');
		if (player)
			player.play();
	}
});

remote.get("/pause", function(req, res) {
	console.log("Paused");
	res.writeHead(200, {
		'Access-Control-Allow-Origin': '*',
		'Content-Type': 'text/plain' });
	res.end("Paused");

	if (document.getElementById('playerContainer'))
	{
		var player = document.getElementById('playerContainer').contentWindow.document.getElementById('player');
		if (player)
			player.pause();
	}
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


	// var player = document.getElementById('playerContainer').contentWindow.document.getElementById('player');
	// if (player)
	// 	player.time(position);
});

remote.start(4242);

// Load PageRenderer
$(document).ready(function() {
	pageRenderer = new (require('./scripts/PageRenderer.js'))(window, document, remote);
	pageRenderer.login();
});
