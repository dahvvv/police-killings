var KillingList = Backbone.Collection.extend({
  model: Killing,
  url: "/api/killings",

  usPopHeat: function(){
    return new KillingList();
  },

  usPopMarker: function(){
    return new KillingList();
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

  stateHeat: function(state){
    var state = state;
    var StateList = Backbone.Collection.extend({
      model: Killing,
      url: "/api/killings/state/" + state,
      query: "state",
      state: state
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