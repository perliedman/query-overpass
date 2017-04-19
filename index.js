var osmtogeojson = require('osmtogeojson'),
    querystring = require('querystring'),
    request = require('request'),
    concat = require('concat-stream'),
    JSONStream = require('JSONStream');

module.exports = function(query, cb, options) {
    options = options || {};

    var handleJson = function(data) {
        var geojson;

        geojson = osmtogeojson(data, {
            flatProperties: options.flatProperties || false
        });
        cb(undefined, geojson);
    };

    var reqOptions = {
        headers: {
            'content-type': 'application/x-www-form-urlencoded'
        },
        body: querystring.stringify({ data: query })
    };
    var r = request.post(options.overpassUrl || 'http://overpass-api.de/api/interpreter', reqOptions);

    r
        .on('response', function(response) {
            if (response.statusCode != 200) {
                r.abort();
                return cb({
                    message: 'Request failed: HTTP ' + response.statusCode,
                    statusCode: response.statusCode
                });
            }
        })
        .pipe(JSONStream.parse())
        .on('data', handleJson)
        .on('error', cb);
    // var r = request.post(options.overpassUrl || 'http://overpass-api.de/api/interpreter', reqOptions)
    //     .on('response', function (response) {
    //         if (response.statusCode === 200) {
    //             var contentLength = response.headers['content-length'];
    //             if (!contentLength || contentLength >= 256 * 1024) {
    //                 r.pipe(JSONStream.parse())
    //                     .on('root', handleJson);
    //             } else {
    //                 r.pipe(concat(function(body) {
    //                     handleJson(JSON.parse(body));
    //                 }));
    //             }
    //         } else {
    //             cb({
    //                 message: 'Request failed: HTTP ' + response.statusCode,
    //                 statusCode: response.statusCode
    //             });
    //         }
    //     })
    //     .on('error', cb);

    return r;
};
