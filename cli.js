#!/usr/bin/env node

var concat = require('concat-stream'),
    argv = require('minimist')(process.argv.slice(2)),
    fs = require('fs'),
    overpass = require('./');

function openData(s) {
    var query = s.toString();
    overpass(query, function(err, geojson) {
        if (!err) {
            console.log(JSON.stringify(geojson));
        } else {
            console.log(err);
        }
    }, {
        overpassUrl: argv['overpass-url']
    });
}

((argv._[0] && fs.createReadStream(argv._[0])) || process.stdin).pipe(concat(openData));
