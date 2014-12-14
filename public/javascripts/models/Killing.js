var Killing = Backbone.Model.extend({
  urlRoot: '/api/killings',
  defaults: {
    visible: true,
    color: 'red'
  }
})
