var pg = require('pg');
var conn = require('./pgConnect');

var client = new pg.Client(conn.connString);
var towns = [];
var geometry = [];
var raster = [];
client.connect(function(err) {
	if (err) {
		return console.error('Could not connect to postgres: ',err);
	}
	else {console.log('Connected to '+ conn.connString)}
	//client.query()
	client.query('SELECT name from county;', function (err,result) {
		if (err) {
			return console.error ("error in query: ", err);
		}
		for (i=0;i<result.rows.length;i++) {
			//console.log(result.rows.length+' rows returned.');
			row = result.rows[i].name;

			towns.push(row);
		}
	});

	client.query('SELECT ST_AsGeoJSON(geom) from county;', function (err, result) {
		if (err) {
			return console.error ("error in query: ", err);
		}
		
		for (i=0; i<result.rows.length;i++) {

			var row = result.rows[i].st_asgeojson;
			var jsonObj = JSON.parse(row);
			var geom = jsonObj;
			geometry.push(geom);
		}	
	});

	/*client.query('SELECT ST_AsPNG(rast) from dem;', function (err, result) {
	*		for (i=0;i<result.rows.length;i++) {
	*			raster.push(result.rows[i]);
	*		}
	*	});
	*/
	client.query('SELECT ')
});

exports.pgClient = {
	towns: towns,
	geometry: geometry,
	dem : raster
}
	
