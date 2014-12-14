function geoJSONify(geoFeatureArr){
  return [
    {
      "type": "FeatureCollection",
      "features": geoFeatureArr
    }
  ]
};

function featureToGeoFormat(lat,lon,i){
  var geoFeature = 
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          lon,
          lat
        ]
      },
      "properties": {
        "title": i,
        "marker-color": "#9c89cc",
        "marker-size": "small",
      }
    };
  return geoFeature;
};

var geoStyle = {
  fillColor: 'red',
  color: 'black',
  radius: 7,
  fillOpacity: 0.8,
  opacity: 0.8,
};

function addGeoLayer(map, geojson){
  var layer = L.geoJson(geojson, {
    pointToLayer: function(feature, latlng){
      return L.circleMarker(latlng, geoStyle);
    }
  }).addTo(map);
};