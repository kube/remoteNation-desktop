var $ = require('./jquery.js');
var sn = require('./api');
var render = require('./render.js');

var PageRenderer = function(document){

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

						$.post('https://api.streamnation.com/api/v1/auth',
							{
								identity: identity,
								password: password
							},
							function(data) {

								authKey = data.auth_token;
								self.setCredentials(authKey);
								self.home();

							}).fail(function(a){
								$('#message').text('Failed Identification');
							});
						return true;
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

						var label = document.createElement('label');
						label.innerHTML = data.movies[i].name;

						var image = document.createElement('img');
						image.src = data.movies[i].covers[1].uri;
						item.name = data.movies[i].contents[0].id;

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