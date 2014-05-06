
var jade = require('jade');

var render = function(viewName, container, variables, callback)
{
	jade.renderFile('views/' + viewName + '.jade', variables,
		function (err, html) {
			if (err) throw err;
			container.innerHTML = html;
			if (callback)
				callback();
		});
}

module.exports = render;
