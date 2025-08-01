Rails.application.routes.draw do
  namespace :api do
    resources :users, only: [:create, :index]
      post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'
  get '/users', to: 'sessions#users'
    resources :incomes, only: [:create, :index]
    resources :budgets, only: [:create,:index]
    resources :expenses, only: [:index, :create]
  end
end