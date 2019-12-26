Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  get '*page', to: 'static#index', constraints: -> (req) do
    !req.xhr? && req.format.html?
  end


  root 'static#index'
end
