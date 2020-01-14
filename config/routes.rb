Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  get '/auth/google_oauth2/callback', to: 'session#create'

  get 'logged_in', to: 'session#logged_in'

  get 'logout', to: 'session#destroy'

  resource :session, only: [:create, :destroy]

  get '/todos/focus', to: 'todos#focus'

  get '/todos/tags', to: 'todos#tags'

  resources :todos

  get '*page', to: 'static#index', constraints: -> (req) do
    !req.xhr? && req.format.html?
  end

  root 'static#index'

end
