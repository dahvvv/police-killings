L.mapbox.accessToken = 'pk.eyJ1IjoibWFycGJvcnhtYXJycnBib3JycnJyeCIsImEiOiJ3Y0hUd3ZZIn0.VNcoUZ2TFXUuID8JQ2-t2A';

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

function makeMap(map, geojson){
  var layer = L.mapbox.featureLayer().addTo(map);
  layer.setGeoJSON(geojson);
  map.fitBounds(layer.getBounds());
};

function makeHeatMap(map,coords){
  var heatLayer = L.heatLayer(coords, {
    // radius: 25,
    // blur: 0,
    // gradient: 1,
    maxZoom: 9,
  }).addTo(map);
  // map.fitBounds(heatLayer.getBounds());
};

var killingList = new KillingList;
var geoFeatureArr = [];
var geoJSON;
var map;


// map.featureLayer.eachLayer(function(layer) {
//           var item = markerList.appendChild(document.createElement('li'));
//           item.innerHTML = layer.toGeoJSON().properties.title;
//           item.onclick = function() {
//              map.setView(layer.getLatLng(), 14);
//              layer.openPopup();
//           };
//       });

$(function(){

  var map = L.mapbox.map('map-one', 'examples.map-i86l3621', {
    scrollWheelZoom: false,
  }).setView([39.8282,-98.5795],4),
  heat = L.heatLayer([]);

  killingList.fetch({
    reset: true,
    success: function(data){
      var coordsArr = [];
      data.toJSON().forEach(function(elem, i){
        var lat = elem.lat;
        var lon = elem.lng;
        // var geoFeature = featureToGeoFormat(lat,lon,i);
        // geoFeatureArr.push(geoFeature);
        coordsArr.push([lat,lon])
      });
      // var geoJSON = geoJSONify(geoFeatureArr);
      // makeMap(map, geoJSON);
      makeHeatMap(map, coordsArr);
    }
  });
});