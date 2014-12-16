var KillingList = Backbone.Collection.extend({
  model: Killing,
  url: "/api/killings",

  // heatMap: function(){
  //   return new KillingList();
  // },

  // markerMap: function(){
  //   return new KillingList();
  // },

  usPopHeat: function(){
    return new KillingList();
  },

  usPopMarker: function(){
    return new KillingList();
  },

  usPopGraph: function(){
    var CityList = Backbone.Collection.extend({
      model: Killing,
      url: "/api/killings",
      query: "city"
    });
    return new CityList();
  },

  ageHeat: function(ageMin,ageMax){
    var min = ageMin;
    var max = ageMax;
    var AgeListRanged =  Backbone.Collection.extend({
      model: Killing,
      url: "/api/killings/victim_age/min/" + min + "/max/" + max,
      query: "victim_age"
    });
    return new AgeListRanged();
  },

  ageMarker: function(){
    var AgeList =  Backbone.Collection.extend({
      model: Killing,
      url: "/api/killings/victim_age",
      query: "victim_age"
    });
    return new AgeList();
  },

  ageGraph: function(){
    var AgeList =  Backbone.Collection.extend({
      model: Killing,
      url: "/api/killings/victim_age",
      query: "victim_age"
    });
    return new AgeList();
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