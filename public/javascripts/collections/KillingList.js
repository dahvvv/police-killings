var KillingList = Backbone.Collection.extend({
  model: Killing,
  url: "/api/killings",
  program: "People killed by police officers in the united states.",

  usPopHeat: function(){
    return new KillingList();
  },

  usPopMarker: function(){
    var PopList = Backbone.Collection.extend({
      model: Killing,
      url: "/api/killings",
      program: "Click on a dot or zoom in for more information."
    });
    return new PopList();
  },

  raceHeat: function(races){
    var races = races;
    var urlstring = "/api/killings/race";
    // $.each(races,function(i,elem){
    //   var urlstring = urlstring + "/" + elem;
    // });
    races.forEach(function(elem){
      var elem = elem.split(" ").join("%20").split("/").join("%2F");
      urlstring = urlstring + "/" + elem;
    });
    debugger;
    var RaceHeatList = Backbone.Collection.extend({
      model: Killing,
      url: urlstring,
      query: "victim_race",
      program: "This heatmap is scaled to show similar total heat for any age range, in order to emphasize changes in locations."
    });
    return new RaceHeatList();
  },

  raceMarker: function(){
    var RaceMarkerList = Backbone.Collection.extend({
      model: Killing,
      url: "/api/killings/race",
      query: "victim_race",
      program: "race program :("
    });
    return new RaceMarkerList();
  },

  ageHeat: function(ageMin,ageMax){
    var min = ageMin;
    var max = ageMax;
    var AgeHeatList =  Backbone.Collection.extend({
      model: Killing,
      url: "/api/killings/victim_age/min/" + min + "/max/" + max,
      query: "victim_age",
      program: "This heatmap is scaled to show similar total heat for any age range, in order to emphasize changes in locations."
    });
    return new AgeHeatList();
  },

  ageMarker: function(){
    var AgeMarkerList =  Backbone.Collection.extend({
      model: Killing,
      url: "/api/killings/victim_age",
      query: "victim_age",
      program: "A point's size and brightness represent its distance from the standard deviation.  An unusual amount of very young or very old people have been killed in Texas and Arkansas.  Zoom in and click for more information."
    });
    return new AgeMarkerList();
  },

  stateViewHeatMap: function(state){
    var state = state;
    var StateList = Backbone.Collection.extend({
      model: Killing,
      url: "/api/killings/state/" + state,
      query: "state"
    });
    return new StateList();
  },

  armedOrUnarmedKillings: function(){
    var ArmedOrUnarmedList = Backbone.Collection.extend({
      model: Killing,
      url: "/api/killings/armed_or_unarmed",
      query: "victim_unarmed"
    });
    return new ArmedOrUnarmedList();
  },
});