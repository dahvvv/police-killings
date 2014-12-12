var KillingView = Backbone.View.extend({

  initialize: function(){
    this.listenTo(this.model, 'sync', this.render);
    alert('synced!');
  },

  render: function(){
    var attributes = this.model.toJSON();
    console.log(attributes);
  }
});

