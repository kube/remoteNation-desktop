var render = require('./render.js');
var $ = require('./jquery-2.1.1.min.js');

var https = require('https');

function loadMovies(auth_token, container, callback)
{
	var options = {
	    hostname: 'api.streamnation.com',
	    port: 443,
	    path: '/api/v1/movies?auth_token=' + auth_token,
	    method: 'GET',
	    headers: {
	        'X-Milestone-Auth-Token' : '',
	        'X-API-Version' : '1.1'
	    }
	};

	var req = https.request(options, function(res) {
	    res.on('data', function(d) {

	        callback(JSON.parse(d));
	    });
	});
	req.end();

	req.on('error', function(e) {
	    console.error(e);
	});
}

var PageRenderer = function(document){

	var	_credentials;
	var container = document.children[0];

	this.setCredentials = function(auth_token)
	{
		_credentials = auth_token;
	};

	this.login = function()
	{
		render('login', container, {pageTitle: "Bonjour tout le monde!"});
	};

	this.home = function()
	{
		this.movies();
	};

	this.movies = function ()
	{
		render('movies', container, { pageTitle: 'Bienvenue' },
			function() {
				loadMovies(_credentials, container, function(data) {
					for (var i in data.movies) {
						var item = document.createElement('li');

						var label = document.createElement('label');
						label.innerHTML = data.movies[i].name;

						var image = document.createElement('img');
						image.src = data.movies[i].covers[1].uri;

						item.appendChild(image);
						item.appendChild(label);
						document.getElementById('moviesContainer').appendChild(item);
					}
			
			});
		});
	}

}

module.exports = PageRenderer;