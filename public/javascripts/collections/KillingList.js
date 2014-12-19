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
  },

  ageHeat: function(ageMin,ageMax){
    var min = ageMin;
    var max = ageMax;
    var AgeHeatList =  Backbone.Collection.extend({
      model: Killing,
      url: "/api/killings/victim_age/min/" + min + "/max/" + max,
      query: "victim_age",
      program: "This heatmap is scaled to show similar total heat for any age range,<br>in order to emphasize changes in locations."
    });
    return new AgeHeatList();
  },

  ageMarker: function(){
    var AgeMarkerList =  Backbone.Collection.extend({
      model: Killing,
      url: "/api/killings/victim_age",
      query: "victim_age",
      program: "A point's size and brightness represent its distance from the standard deviation.<br>An unusual amount of very young or very old people have been killed in Texas and Arkansas."
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
      program: "View any individual state."
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
      program: "View any individual state."
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