const sparql = require('sparql-client-2');

const sparql_ldgeo_edpt = 'http://linkedgeodata.org/sparql';

var client = new sparql(sparql_ldgeo_edpt).register({
    lgdo: 'http://linkedgeodata.org/ontology/'
});

var query = `
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
    PREFIX ogc: <http://www.opengis.net/ont/geosparql#>
    PREFIX geom: <http://geovocab.org/geometry#>
    PREFIX geo: <http://www.w3.org/2003/01/geo/wgs84_pos#>
    SELECT DISTINCT ?label ?lat ?lon
    WHERE {
        ?place a lgdo:Place ;
               rdfs:label ?label ;
               geo:lat ?lat ;
               geo:long ?lon ;
               geom:geometry [ ogc:asWKT ?placeGeom ] .
        FILTER (bif:st_intersects (?placeGeom, bif:st_point(?r_lon, ?r_lat), ?radius)) .
    }
    LIMIT ?limit
`;

var place_query = `
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
    PREFIX ogc: <http://www.opengis.net/ont/geosparql#>
    PREFIX geom: <http://geovocab.org/geometry#>
    PREFIX geo: <http://www.w3.org/2003/01/geo/wgs84_pos#>
    SELECT DISTINCT ?label ?lat ?lon
    WHERE {
        ?place a lgdo:Place ;
               rdfs:label ?label ;
               geo:lat ?lat ;
               geo:long ?lon .
        FILTER regex(?label, ?text, "i") .
    }
    LIMIT ?limit
`;

module.exports = {
  search_places: function (text, limit=10) {
    return new Promise(function(resolve, reject) {
      client.query(place_query)
      .bind('text', text)
      .bind('limit', limit)
      .execute()
      .then(function(data) {
        res = []
        bindings = data.results.bindings;
        bindings.forEach((obj) => {
            res.push({ name: obj.label.value,
                       lat: obj.lat.value,
                       lon: obj.lon.value })
        });
        resolve(res);
      })
      .catch(function(error) {
        reject(error);
      });
    });
  }
};
