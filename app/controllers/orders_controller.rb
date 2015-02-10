class OrdersController < ApplicationController
  IN_CART = 1
  PLACED = 2
  SHIPPED = 3
  CACELLED = 4

  def checkout
    @order = current_order
    @order.update_attributes({order_status_id: PLACED})
    session[:order_id] = nil
    redirect_to products_url
  end

  def shipped
    @order = Order.find(params[:id])
    @order.update_attributes({order_status_id: SHIPPED})
    redirect_to seller_orders_url
  end

  # This should be moved to Backbone
  def seller_orders
    @products = current_user.shop.products.ids
    @all_order_items = OrderItem.all
    @orders = []
    @all_order_items.each do |order_item|
      @orders << order_item.order if @products.include?(order_item.product_id)
    end
    @orders.uniq!
    render "seller_orders"
  end

  def buyer_orders
    @order_items = current_user.ordered_items
    render "buyer_orders"
  end

  # def index
  #   if params[:role] == "seller"
  #     @orders = current_user.sold_orders
  #   else
  #     @orders = current_user.ordered_items
  #   end
  # end
end
