var render = require('./render.js');
var $ = require('./jquery-2.1.1.min.js');

var https = require('https');

function getPlayback(auth_token, id, container, callback)
{
	var options = {
	    hostname: 'api.streamnation.com',
	    port: 443,
	    path: '/api/v1/content/' + id + '/playback?auth_token=' + auth_token,
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

function getMoviesList(auth_token, container, callback)
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

function startPlayer(document, uri)
{
	if (document.getElementById("player"))
	{
		//$('#player').hide();
		// $("#player").playFile(uri, 0);
		console.log(document.getElementById);
// debugger
		// document.getElementById("player").playFile(uri, 0);
	}
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
		var self = this;

		render('movies', container, { pageTitle: 'Bienvenue' },
			function() {
				getMoviesList(_credentials, container, function(data) {
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
		getPlayback(_credentials, id, container, function(data) {
			render('playback', container, {id: encodeURIComponent(data.playback.playback_uri)});
		});
	}

}

module.exports = PageRenderer;