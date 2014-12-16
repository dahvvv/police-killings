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
var defaultLat = 37.78808138412046;
var defaultLon = -94.39453125;
var defaultZoom = 4;

$(function(){
  map = L.mapbox.map('map-one', 'marpborxmarrrpborrrrrx.kg7bjg5l', {
    scrollWheelZoom: false,
    draggable: true
  }).setView([defaultLat,defaultLon],defaultZoom);

  var killingList = new KillingList();
  killingList.listenToOnce(killingList, 'reset', makeHeatMap);
  var killingListView = new KillingListView({collection: killingList, el: $('body')});
  killingList.fetch({reset: true});

  $('#age-heat').on('click', function(e){
    $('#age-range').children().toggle().css({"display":"block"});
  });

  $('.display-selector').on('click', function(e){
    // e.preventDefault();
    $('.display-selector').removeClass('display-type');
    $(this).addClass('display-type');
    // var filterType = $('.filter-type').attr('id');
    // $('body').data("filter", filterType);
    // $(this).trigger('custom');
  });

  $('.button-filter').on('click', function(){
    $('.button-filter').removeClass('filter-type');
    $(this).addClass('filter-type');
  });


  
});