EtsyClone.Routers.Router = Backbone.Router.extend({
  initialize: function(shops, $rootEl) {
    this.shops = shops;
    this.$rootEl = $rootEl;
  },

  routes: {
    '': 'index',
    'shops/new': 'shopNew',
    'shops/:id': 'shopShow',
    'shops/:id/edit' : 'shopEdit',
    'seller_products/new' : 'productNew',
    'seller_products/all' : 'productAll',
    // 'seller_products/:id' : 'productShow',
    'products/:id/edit' : 'productEdit',
    'cart' : 'cartShow'
    // 'buyer_orders' : 'buyerOrders'
  },

  index: function () {
    var all_products = new EtsyClone.Collections.Products();
    all_products.fetch();

    var index = new EtsyClone.Views.ProductAll({
      collection: all_products
    });

    this._swapView(index);
  },

  shopNew: function (id) {
    var shop = new EtsyClone.Models.Shop();

    var newView = new EtsyClone.Views.ShopForm({
      model: shop,
      collection: this.shops
    });

    this._swapView(newView);
  },

  shopShow: function (id) {
    var shop = this.shops.getOrFetch(id);

    var shopView = new EtsyClone.Views.ShopShow({
      model: shop
    });

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

  productNew: function () {
    var product = new EtsyClone.Models.Product();

    var newView = new EtsyClone.Views.ProductForm({
      model: product,
      collection:  CURRENT_USER.shop.products()
    });

    this._swapView(newView);
  },

  productAll: function () {
    var allProductView = new EtsyClone.Views.ProductAll({
      collection:  CURRENT_USER.shop.products()
    });

    this._swapView(allProductView);
  },

  // productShow: function (id) {
  //   var product = CURRENT_USER.shop.products().getOrFetch(id);
  //   var productView = new EtsyClone.Views.ProductShow({ model: product });
  //   this._swapView(productView);
  // },
  //
  productEdit: function (id) {
    var product = CURRENT_USER.shop.products().getOrFetch(id);
    var editView = new EtsyClone.Views.ProductForm({
      model: product,
      collection:  CURRENT_USER.shop.products()
    });
    this._swapView(editView);
  },

  cartShow: function () {
    var order = new EtsyClone.Models.Order({id: CURRENT_ORDER.id});
    order.fetch();

    var cartShowView = new EtsyClone.Views.OrderShow({
      model: order
    });

    this._swapView(cartShowView);
  },

  // buyerOrders: function() {
  //   var orders = new EtsyClone.Collections.Orders();
  //   orders.fetch();
  //   var buyerView = new EtsyClone.Views.BuyerOrder({
  //     collection: orders
  //   });
  //   this._swapView(buyerView);
  // },

  _swapView: function (view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(view.render().$el);
  }
})
