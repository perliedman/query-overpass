query-overpass [![NPM version](https://badge.fury.io/js/query-overpass)](http://badge.fury.io/js/query-overpass)
=========

Make queries to [OpenStreetMap](http://www.openstreetmap.org/)'s [overpass API](http://wiki.openstreetmap.org/wiki/Overpass_API) and output as [GeoJSON](http://geojson.org/).

## cli

install:

```bash
$ npm install -g query-overpass
```

use:

```bash
$ echo '[out:json];node(57.7,11.9,57.8,12.0)[amenity=bar];out;' | query-overpass
```

Optionally, a file containing the query can be passed as the first argument:

```bash
$ query-overpass query.ql
```

Goes well together with other command line tools, like for example [geojsonio-cli](https://github.com/mapbox/geojsonio-cli):

```bash
$ npm install -g geojsonio-cli
$ echo '[out:json];node(57.7,11.9,57.8,12.0)[amenity=bar];out;' | query-overpass | geojsonio
```

You can also provide the URL where the Overpass API is located:

```bash
$ query-overpass --overpass-url http://my.overpass-provider.org/
```

The default is to use `http://overpass-api.de/api/interpreter`.

## usage

Installation is easy with npm:

```bash
$ npm install query-overpass
```

## api

query-overpass exports a single function:

### query_overpass(query, callback, options)

Performs the provided query and calls the callback when done. The callback is of the form

```javascript
callback(error, data)
```

Where error is an object containing `message` and `statusCode` if an error occured, or `undefined` if
no error occured. `data` will be the query response as an GeoJSON object.

The only option supported at the moment is `overpassUrl`, which will default to `'http://overpass-api.de/api/interpreter'` unless specified.
