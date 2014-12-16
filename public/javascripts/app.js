L.mapbox.accessToken = 'pk.eyJ1IjoibWFycGJvcnhtYXJycnBib3JycnJyeCIsImEiOiJ3Y0hUd3ZZIn0.VNcoUZ2TFXUuID8JQ2-t2A';

// map.featureLayer.eachLayer(function(layer) {
//           var item = markerList.appendChild(document.createElement('li'));
//           item.innerHTML = layer.toGeoJSON().properties.title;
//           item.onclick = function() {
//              map.setView(layer.getLatLng(), 14);
//              layer.openPopup();
//           };
//       });

var geoLayer;
var heatLayer;

$(function(){
  map = L.mapbox.map('map-one', 'marpborxmarrrpborrrrrx.kg7bjg5l', {
    scrollWheelZoom: false,
    draggable: true
  }).setView([38.376115424036016,-97.470703125],4);


  var killingList = new KillingList();
  killingList.listenToOnce(killingList, 'reset', makeHeatMap);
  var killingListView = new KillingListView({collection: killingList, el: $('body')});
  killingList.fetch({reset: true});

  $('.age-heat').on('click', function(e){
    e.preventDefault();
    $('#age-range').children().toggle().css({"display":"block"});
  });
  
});