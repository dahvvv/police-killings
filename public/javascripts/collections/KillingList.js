var KillingList = Backbone.Collection.extend({
  url: "/api/killings",
  // url: function(){
  //   return "/api/killings" + this.get("search");
  // },
  // url: function(){
  //   if ($('#container').attr('class') === "") {
  //     return "/api/killings"
  //   } else {}
  //   return "/api/killings/" + $('#container').attr('class');
  // },
  model: Killing,

});