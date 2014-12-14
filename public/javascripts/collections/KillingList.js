var KillingList = Backbone.Collection.extend({
  url: "/api/killings",
  model: Killing,

  // maleContacts:  function(){
  //   return this.models.filter(function(contact){
  //     return contact.get('gender') === 'Male'
  //   });
  // },

  armedOrUnarmedKillings: function(){
    // var armedOrUnarmedList = this.models.filter(function(killing){
    //   var unarmed = killing.get('victim_unarmed');
    //   return unarmed === true || unarmed === false;
    // });
  //or coule be .map, look at mdn array prototype methods
    var ArmedOrUnarmedList = Backbone.Collection.extend({model: Killing, url: "/api/killings/armed_or_unarmed"});
    // return new ArmedOrUnarmedList(armedOrUnarmedList);
    return new ArmedOrUnarmedList();
  },
});