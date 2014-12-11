var KillingView = Backbone.View.extend({



  render: function(){
    var attributes = this.model.toJSON();
    console.log(attributes);
  }
});
