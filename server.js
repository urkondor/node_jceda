var express = require('express');
var pg = require('./pg_app');

var app = express()

app.use(express.static(__dirname+ '/public'));

app.get('/towns', function (req,res) {
	console.log('Request received.');
	console.log(pg.pgClient.geometry);
	res.status(200).send({
		towns:pg.pgClient.towns,
		geom :pg.pgClient.geometry,
		dem  :pg.pgClient.dem
	});
});

app.listen(3000);