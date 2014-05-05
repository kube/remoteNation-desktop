
var fs = require('fs');
var http = require('http');
var render = require('./scripts/render.js');


$(document).ready(function() {
	render('index', document.children[0], {pageTitle: "Bonjour tout le monde!"});
});


// Remote Server
var server = http.createServer(function(req, res) {

	console.log("Request");
	res.end('Coucou');

}).listen(4242);