## A few words on diversity in tech

[![Greenkeeper badge](https://badges.greenkeeper.io/perliedman/query-overpass.svg)](https://greenkeeper.io/)

I need to take some of your time. I can't believe we let shit like [the Kathy Sierra incident](http://www.wired.com/2014/10/trolls-will-always-win/) or [what happened to Brianna Wu](https://twitter.com/Spacekatgal/status/520739878993420290) happen over and over again. I can't believe we, the open source community, let [sexist, misogynous shit happen over and over again](http://geekfeminism.wikia.com/wiki/Timeline_of_incidents).

I strongly believe that it is my &mdash; and your &mdash; duty to make the open source community, as well as the tech community at large, a community where everyone feel welcome and is accepted. At the very minimum, that means making sure the community and its forums both _are_ safe, and are perceived as safe. It means being friendly and inclusive, even when you disagree with people. It means not shrugging off discussions about sexism and inclusiveness with [handwaving about censorship and free speech](https://josm.openstreetmap.de/ticket/10568). For a more elaborate document on what that means, [the NPM Code of Conduct](http://www.npmjs.com/policies/conduct) is a good start, [Geek Feminism's resources for allies](http://geekfeminism.wikia.com/wiki/Resources_for_allies) contains much more.

While I can't force anyone to do anything, if you happen to disagree with this, I ask of you not to use any of the open source I have published. Nor am I interested in contributions from people who can't accept or act respectfully towards other humans regardless of gender identity, sexual orientation, disability, ethnicity, religion, age, physical appearance, body size, race, or similar personal characteristics. If you think feminism, anti-racism or the LGBT movement is somehow wrong, disturbing or irrelevant, I ask you to go elsewhere to find software.

# query-overpass [![NPM version](https://badge.fury.io/js/query-overpass.svg)](http://badge.fury.io/js/query-overpass) [![Build Status](https://travis-ci.org/perliedman/query-overpass.svg?branch=master)](https://travis-ci.org/perliedman/query-overpass)

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

You can also flatten each GeoJSON feature, making it more easily processable by other software and tools

```bash
$ query-overpass --flat-properties
```

The default behaviour, without adding `--flat-properties` is to use `false` to be consistent with previous version.

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

The options supported at the moment are

* `overpassUrl`, which will default to `'http://overpass-api.de/api/interpreter'` unless specified.
* `flatProperties` which will default to `false`.
