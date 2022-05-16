Rails.application.routes.draw do
  resources :shorturls, param: :stub
  get '/:stub', to: 'shorturls#show'

  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"

end
