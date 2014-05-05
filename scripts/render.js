
var jade = require('jade');

var render = function(viewName, container, variables)
{
	jade.renderFile('views/' + viewName + '.jade', variables,
		function (err, html) {
			if (err) throw err;
			container.innerHTML = html;
		});
}

module.exports = render;
