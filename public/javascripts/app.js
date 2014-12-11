L.mapbox.accessToken = 'pk.eyJ1IjoibWFycGJvcnhtYXJycnBib3JycnJyeCIsImEiOiJ3Y0hUd3ZZIn0.VNcoUZ2TFXUuID8JQ2-t2A';

function geoJSONify(geoFeatureArr){
  return [
    {
      "type": "FeatureCollection",
      "features": geoFeatureArr
    }
  ]
};

function featureToGeoFormat(lat,lon){
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
        "title": "The White House",
        "marker-color": "#9c89cc",
        "marker-size": "medium",
        "marker-symbol": "building"
      }
    };
  return geoFeature;
};

function makeMap(map, geojson){
  var layer = L.mapbox.featureLayer();
  layer.addTo(map);
  layer.setGeoJSON(geojson);
  map.fitBounds(layer.getBounds());
};

var killingList = new KillingList;
var geoFeatureArr = [];

$(function(){

  var map = L.mapbox.map('map-one', 'examples.map-i86l3621', {
    scrollWheelZoom: false,
    legendControl: {
      position: 'topright'
    }
  });
  // heat = L.heatLayer([], { maxZoom: 12 }).addTo(map);

  killingList.fetch({
    reset: true,
    success: function(data){
      data.toJSON().forEach(function(elem){
        console.log(elem.lat);
        var lat = elem.lat;
        var lon = elem.lng;
        var geoFeature = featureToGeoFormat(lat,lon);
        geoFeatureArr.push(geoFeature);
      });
      var geoJSON = geoJSONify(geoFeatureArr);
      makeMap(map, geoJSON);
    }
  });
});