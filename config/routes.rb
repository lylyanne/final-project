Rails.application.routes.draw do
  root to: "static_pages#root"
  get "current_user_data", to: "users#current_user_data"
  resources :users, only: [:new, :create, :index]
  resource :session, only: [:new, :create, :destroy]

  namespace :api, :defaults => { :format => :json } do
    resources :shops, except: :destroy
    resources :products
    resources :order_items, except: [:new, :edit]
    resources :orders, only: [:show, :update, :index, :create]
  end

  resources :shops, only: [:show]
  resources :products, only: [:index]
  resource :cart, only: [:show]
  resources :order_items, only: [:create, :update, :destroy]

  post '/checkout', to: 'orders#checkout', as: 'checkout'
  get '/buyer_orders', to: 'orders#buyer_orders', as: 'buyer_orders'
  post '/shipped/:id', to: 'orders#shipped', as: 'shipped'

  #this shouldn't be Rails route
  get '/seller_orders', to: 'orders#seller_orders', as: 'seller_orders'
end
