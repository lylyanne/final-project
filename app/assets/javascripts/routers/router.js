EtsyClone.Routers.Router = Backbone.Router.extend({
  initialize: function(shops, $rootEl) {
    this.shops = shops;
    this.$rootEl = $rootEl;
  },

  routes: {
    '': 'welcome',
    'shops/:id': 'shopShow',
    'shops/:id/edit' : 'shopEdit'
  },

  welcome: function () {
    var welcomeView = new EtsyClone.Views.ShopWelcome();
    this._swapView(welcomeView);
  },

  shopShow: function (id) {
    var shop = this.shops.getOrFetch(id);
    var shopView = new EtsyClone.Views.ShopShow({ model: shop });
    this._swapView(shopView);
  },

  shopEdit: function (id) {
    var shop = this.shops.getOrFetch(id);
    var editView = new EtsyClone.Views.ShopForm({
      model: shop,
      collection: this.shops
     });
    this._swapView(editView);
  },

  _swapView: function (view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(view.render().$el);
  }
})