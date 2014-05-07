var https = require('https');
var querystring = require('querystring');
var $ = require('./jquery.js');
var sn = require('./api');
var render = require('./render.js');

var PageRenderer = function(document, remote){

	var self = this;
	var	_credentials;
	var container = document.children[0];

	this.setCredentials = function(auth_token)
	{
		_credentials = auth_token;
	};

	this.login = function()
	{
		render('login', container, {pageTitle: "Bonjour tout le monde!"},
			function()
			{
				document.getElementById('loginForm').addEventListener('submit',
					function() {
						console.log('submit');
						var identity = $('#identityField').val();
						var password = $('#passwordField').val();

						console.log(identity);
						console.log(password);

						var post_data = {
								identity: identity,
								password: password
							};

						post_data = querystring.stringify(post_data);

						var options = {
						    hostname: 'api.streamnation.com',
						    port: 443,
						    path: '/api/v1/auth',
						    method: 'POST',
						    headers: {
								'Content-Type': 'application/x-www-form-urlencoded',
								'Content-Length': post_data.length
						    }
						};
						var req = https.request(options, function(res) {
						    res.on('data', function(d) {
						    	data = JSON.parse(d);
						    	process.stdout.write(d);
						    	var authKey = data.auth_token;
								self.setCredentials(authKey);
								self.home();
						    });
						});
						req.write(post_data);
						req.end();
						req.on('error', function(e) {
						    console.error(e);
							$('#message').text('Failed Identification');
						});
						return false;
					});
			});
	};

	this.home = function()
	{
		this.movies();
	};

	this.movies = function ()
	{
		var self = this;
		render('movies', container, { pageTitle: 'Bienvenue' },
			function() {
				sn.getMoviesList(_credentials, container, function(data) {
					for (var i in data.movies) {
						var item = document.createElement('li');
						item.name = data.movies[i].contents[0].id;

						var label = document.createElement('label');
						label.innerHTML = data.movies[i].name;

						var image = document.createElement('img');
						image.src = data.movies[i].covers[1].uri;

						item.appendChild(image);
						item.appendChild(label);
						item.addEventListener('click', function() {

							console.log(this.name);
							self.moviePlayback(this.name);

						});
						document.getElementById('moviesContainer').appendChild(item);
					}
			});
		});
	}

	this.moviePlayback = function (id)
	{
		sn.getPlayback(_credentials, id, container, function(data) {
			render('playback', container, {id: encodeURIComponent(data.playback.playback_uri)});
		});
	}

}

module.exports = PageRenderer;
