#!/usr/bin/env node

var concat = require('concat-stream'),
    argv = require('minimist')(process.argv.slice(2), {
        string: 'overpass-url',
        boolean: 'flat-properties',
        boolean: 'version',
        default: {
            'flat-properties': false
        }
    }),
    fs = require('fs'),
    overpass = require('./');

if (argv['version'])
  return process.stdout.write(require('./package.json').version+'\n');

function openData(s) {
    var query = s.toString();
    overpass(query, function(err, geojson) {
        if (!err) {
            console.log(JSON.stringify(geojson));
        } else {
            console.error(err);
            process.exit(1);
        }
    }, {
        overpassUrl: argv['overpass-url'],
        flatProperties: argv['flat-properties']
    });
}

((argv._[0] && fs.createReadStream(argv._[0])) || process.stdin).pipe(concat(openData));
