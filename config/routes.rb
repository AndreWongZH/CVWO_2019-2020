Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  get 'add', to: 'static#index', constraints: -> (req) do
    !req.xhr? && req.format.html?
  end

  get 'focus', to: 'static#index', constraints: -> (req) do
  !req.xhr? && req.format.html?
  end

  get 'edit/:id', to: 'static#index', constraints: -> (req) do
  !req.xhr? && req.format.html?
  end

  get '/todos/focus', to: 'todos#focus'

  resources :todos

  root 'static#index'

end
