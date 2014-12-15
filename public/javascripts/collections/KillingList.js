var KillingList = Backbone.Collection.extend({
  model: Killing,
  url: "/api/killings",

  heatMap: function(){
    return new KillingList();
  },

  markerMap: function(){
    return new KillingList();
  },

  ageMarkMap: function(){
    var AgeList =  Backbone.Collection.extend({
      model: Killing,
      url: "/api/killings/victim_age",
      query: "victim_age"
    });
    return new AgeList();
  },

  ageHeatMap: function(ageMin,ageMax){
    var min = ageMin;
    var max = ageMax;
    var AgeListRanged =  Backbone.Collection.extend({
      model: Killing,
      url: "/api/killings/victim_age/min/" + min + "/max/" + max,
      query: "victim_age"
    });
    return new AgeListRanged();
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