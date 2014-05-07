var RemoteServer = require('./scripts/RemoteServer.js');
var authKey = null;
var url = require('url');
var http = require('http');

console.log("Starting Player");

// Store current IP Adress
var os = require('os');
var ifaces = os.networkInterfaces();
for (var dev in ifaces) {
  var alias = 0;
  ifaces[dev].forEach(function(details){
    if (details.family=='IPv4') {
      // console.log(dev+(alias?':'+alias:''),details.address);
      if (details.address != '127.0.0.1')
      {
      	console.log(details.address);
      	var reqSetIp = "http://10.12.4.2:1337/set?ip=" + details.address;
      	console.log(reqSetIp);
	      http.get(reqSetIp);
      }
      ++alias;
    }
  });
}


currentRemoteRequests = new Array();



// Configure Remote Server
var remote = new RemoteServer();

function alertClients(content) {

	for (var i in currentRemoteRequests)
	{

		console.log("COCIUEWIJHBWEKJRWER WEJKHRHJKERWHJKEWRKHJEWRKHKHWERKHJRWEHKJWE");
		currentRemoteRequests[i].writeHead(200, {
			'Access-Control-Allow-Origin': '*',
			'Content-Type': 'text/plain' });
		currentRemoteRequests[i].end(content);
	}
}



remote.get("/play", function(req, res) {
	console.log("Playing");
	res.writeHead(200, {
		'Access-Control-Allow-Origin': '*',
		'Content-Type': 'text/plain' });
	res.end("Playing");

	var id = url.parse(req.url, true).query.id;

	if (!player || (id && document.getElementById('playerContainer').movieId != id))
	{
		alertClients('play');
		pageRenderer.moviePlayback(id);
	}
	else if (document.getElementById('playerContainer'))
	{
		var player = document.getElementById('playerContainer').contentWindow.document.getElementById('player');
		if (player){
			alertClients('play');
			player.play();
		}
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
		{
			alertClients('pause');
			player.pause();
		}
	}
});

remote.get("/refresh", function(req, res) {
	console.log("refresh");
	// res.writeHead(200, {
	// 	'Access-Control-Allow-Origin': '*',
	// 	'Content-Type': 'text/plain' });

	currentRemoteRequests.push(res);

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
