var KillingView = Backbone.View.extend({
  template: _.template($('#killing-template').html()),

  render: function(){
    var attributes = this.model.toJSON();
    this.$el.html(this.template(attributes));
    return this;
  }
});