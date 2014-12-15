var KillingList = Backbone.Collection.extend({
  model: Killing,
  url: "/api/killings",

  markerMap: function(){
    return new KillingList();
  },

  ageMap: function(){
    var AgeList =  Backbone.Collection.extend({
      model: Killing,
      url: "/api/killings/victim_age",
      query: "victim_age"
    });
    return new AgeList();
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