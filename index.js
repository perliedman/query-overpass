var osmtogeojson = require('osmtogeojson'),
    querystring = require('querystring'),
    request = require('request');

module.exports = function(query, cb, options) {
    options = options || {};
    var reqOptions = {
        headers: {
            'content-type': 'application/x-www-form-urlencoded'
        },
        body: querystring.stringify({ data: query })
    };
    return request.post(options.overpassUrl || 'http://overpass-api.de/api/interpreter', reqOptions, function (error, response, body) {
        var geojson;

        if (!error && response.statusCode === 200) {
            geojson = osmtogeojson(JSON.parse(body), {
                flatProperties: options.flatProperties || false
            });
            cb(undefined, geojson);
        } else if (error) {
            cb(error);
        } else if (response) {
            cb({
                message: 'Request failed: HTTP ' + response.statusCode,
                statusCode: response.statusCode
            });
        } else {
            cb({
                message: 'Unknown error.',
            });
        }
    });
};
