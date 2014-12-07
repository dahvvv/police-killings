var KillingList = Backbone.Collection.extend({
  url: '/api/killings',
  model: Killing
});