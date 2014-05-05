
var fs = require('fs');
var jade = require('jade');

var render = function(viewName, variables)
{
	jade.renderFile('views/' + viewName + '.jade', variables,
		function (err, html) {
			if (err) throw err;
			document.getElementsByTagName('html')[0].innerHTML = html;
		});
}

$(document).ready(function() {
	render('index', {pageTitle: "Bonjour tout le monde!"});
});
