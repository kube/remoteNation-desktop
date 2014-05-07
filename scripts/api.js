var https = require('https');

var api = {

	getPlayback: function(auth_token, id, container, callback)
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
	},

	getMoviesList: function(auth_token, container, callback)
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

}

module.exports = api;
