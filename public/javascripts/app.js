L.mapbox.accessToken = 'pk.eyJ1IjoibWFycGJvcnhtYXJycnBib3JycnJyeCIsImEiOiJ3Y0hUd3ZZIn0.VNcoUZ2TFXUuID8JQ2-t2A';

function triggerBang(context){
  $(context).trigger('change');
};

function replaceDisplaySelector(context){
  var that = context;
  $('.display-selector').removeClass('display-type');
  $(that).addClass('display-type');
  triggerBang(that);
};

function jsonElemToObjLiteral(elem,query){
  var options = {
    query: query,
    lat: elem.lat,
    lon: elem.lng,
    address: elem.formatted_address,
    name: elem.victim_name,
    age: elem.victim_age,
    gender: elem.victim_gender,
    img: elem.url_victim_image,
    source: elem.source,
    description: elem.description,
    unarmed: elem.victim_unarmed,
    shots: elem.shots_fired,
    illness: elem.symptoms_of_mental_illness
  };
  return options;
};

var geoLayer;
var heatLayer;
var defaultLat = 37.78808138412046;
var defaultLon = -94.39453125;
var defaultZoom = 4;

$(function(){
  map = L.mapbox.map('map-one', 'marpborxmarrrpborrrrrx.kg7bjg5l', {
    scrollWheelZoom: true,
    draggable: true
  }).setView([defaultLat,defaultLon],defaultZoom);

  var killingList = new KillingList();
  killingList.listenToOnce(killingList, 'reset', makeHeatMap);
  var killingListView = new KillingListView({collection: killingList, el: $('body')});
  killingList.fetch({reset: true});

  $('#age-filter').on('click', function(e){
    debugger;
    $('#age-range').children().toggle().css({"display":"block"});
  });

  $('.display-selector').on('click', function(e){
    e.preventDefault();
    var that = this;
    replaceDisplaySelector(that);
  });

  $('.button-filter').on('click', function(){
    $('.button-filter').removeClass('filter-type');
    $(this).addClass('filter-type');
  });

});