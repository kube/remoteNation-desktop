var render = require('./render.js');
var $ = require('./jquery-2.1.1.min.js');

function loadMovies(auth_token)
{
	console.log(auth_token);

	var url = 'https://api.streamnation.com/api/v1/library?auth_token=' + auth_token;
	console.log(url);

	$.get(url,
		function(data) {

			console.log(data);

		}).fail(function(a){
			console.log(a);
			$('body').text('Cannot reach user\'s library');
		});
}

var PageRenderer = function(container){

	var	_credentials;

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
		render('index', container, { pageTitle: 'Bienvenue' },
			function() {
				loadMovies(_credentials);
			});
	};

}

module.exports = PageRenderer;