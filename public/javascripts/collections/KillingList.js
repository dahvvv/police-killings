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

  filterByRace: function(race){
    return this.filter(function(victim){
      return victim.get("victim_race") === race;
    });
  },

  filterByRaces: function(races){
    var arr = []
    var that = this;
    _.each(races, function(race){
      var filtered = that.filterByRace(race);
      arr = arr.concat(filtered);
    });
    return new KillingList(arr);
    // var races = races;
    // var urlBase = "/api/killings/race";
    // // races.forEach(function(elem){
    // //   var elem = elem.split(" ").join("%20").split("/").join("%2F");
    // //   urlstring = urlstring + "/" + elem;
    // // });


    // //shit, I'm running out of time and can't do this gracefully.

    // if (races.length === 0) {
    //   var urlAddendum = "";
    // } else if (races.length === 1) {
    //   var urlAddendum = "/one/" + races[0];
    // } else if (races.length === 2) {
    //   var urlAddendum = "/one/" + races[0] + "/two/" + races[1];
    // } else if (races.length === 3) {
    //   var urlAddendum = "/one/" + races[0] + "/two/" + races[1] + "/three/" + races[2];
    // } else if (races.length === 4) {
    //   var urlAddendum = "/one/" + races[0] + "/two/" + races[1] + "/three/" + races[2] + "/four/" + races[3];
    // } else if (races.length === 5) {
    //   var urlAddendum = "/one/" + races[0] + "/two/" + races[1] + "/three/" + races[2] + "/four/" + races[3] + "/five/" + races[4];
    // } else if (races.length === 6) {
    //   var urlAddendum = "/one/" + races[0] + "/two/" + races[1] + "/three/" + races[2] + "/four/" + races[3] + "/five/" + races[4] + "/six/" + races[5];
    // };
    // var url = urlBase + urlAddendum;
    // var RaceHeatList = Backbone.Collection.extend({
    //   model: Killing,
    //   url: url,
    //   query: "victim_race",
    //   program: "This heatmap is scaled to show similar total heat for any age range, in order to emphasize changes in locations."
    // });
    // return new RaceHeatList();
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

  stateHeat: function(state){
    var state = state;
    var StateList = Backbone.Collection.extend({
      model: Killing,
      state: state,
      url: "/api/killings/state/" + state,
      query: "state",
      program: "state view"
    });
    return new StateList();
  },

  stateMarker: function(state){
    var state = state;
    var StateMarkerList = Backbone.Collection.extend({
      model: Killing,
      state: state,
      url: "/api/killings/state/" + state,
      query: "state",
      program: "state view marker"
    });
    return new StateMarkerList();
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