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

  // usPopGraph: function(){
  //   var CityList = Backbone.Collection.extend({
  //     model: Killing,
  //     url: "/api/killings/cities",
  //     query: "city"
  //   });
  //   return new CityList();
  // },

  ageHeat: function(ageMin,ageMax){
    var min = ageMin;
    var max = ageMax;
    var AgeListRanged =  Backbone.Collection.extend({
      model: Killing,
      url: "/api/killings/victim_age/min/" + min + "/max/" + max,
      query: "victim_age",
      program: "This heatmap is scaled to show similar total heat for any ages, in order to emphasize changes in locations."
    });
    return new AgeListRanged();
  },

  ageMarker: function(){
    var AgeList =  Backbone.Collection.extend({
      model: Killing,
      url: "/api/killings/victim_age",
      query: "victim_age",
      program: "Weird dots represent outlierz."
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