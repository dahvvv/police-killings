var Killing = Backbone.Model.extend({
  urlRoot: '/api/killings'
})

// L.geoJson(data, {
//   style: function (feature) {
// return {color: feature.properties.color};
//   },
//   onEachFeature: function (feature, layer) {
// layer.bindPopup(feature.properties.description);
//   }
// }).addTo(map);

// var geoLayer = L.geoJson()



// new attempt at adding style, making it a lil more logical
// function addLayer(map, data){
//   var layer = L.geoJson(data, {
//     pointToLayer: function(feature, latlng){
//       return L.circleMarker(latlng, geojsonMarkerOptions);
//     },
//     setStyle: function(feature){
      
//     }
//   });
//   layer.addTo(map);
//   map.fitBounds(layer.getBounds());
// };
