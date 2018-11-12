Rails.application.routes.draw do
  resources :acids
  resources :histories
  mount_devise_token_auth_for 'User', at: 'auth'

  get '/waters/:id', to: 'waters#show'
  resources :water_profiles, only: [:index]

  get '/waters/:id', to: 'waters#show'
  put '/waters/:id', to: 'waters#update'
  resources :waters

  get '/water_agents/:id', to: 'water_agents#show'
  put '/water_agents/:id', to: 'water_agents#update'
  resources :water_agents

  get '/malts/:id', to: 'malts#show'
  put '/malts/:id', to: 'malts#update'
  resources :malts

  get '/malt_types', to: 'malt_types#index'
  get '/malt_types/:id', to: 'malt_types#show'

  get '/mash_steps', to: 'mash_steps#index'
  get '/mash_steps/:id', to: 'mash_steps#show'

  get '/styles/:id', to: 'styles#show'
  put '/styles/:id', to: 'styles#update'
  resources :styles

  get '/hops/:id', to: 'hops#show'
  put '/hops/:id', to: 'hops#update'
  resources :hops

  get '/miscellaneous/:id', to: 'miscellaneous#show'
  put '/miscellaneous/:id', to: 'miscellaneous#update'
  resources :miscellaneous

  get '/yeasts/:id', to: 'yeasts#show'
  put '/yeasts/:id', to: 'yeasts#update'
  resources :yeasts

  get '/equipment/:id', to: 'equipment#show'
  put '/equipment/:id', to: 'equipment#update'
  resources :equipment

  get '/recipes/count', to: 'recipes#count'
  get '/recipes/:id', to: 'recipes#show'
  put '/recipes/:id', to: 'recipes#update'
  resources :recipes

  post '/contact_us', to: 'contacts#create'

  get '/measurement_settings', to: 'measurement_settings#show'
  put '/measurement_settings', to: 'measurement_settings#update'
  resources :measurement_settings

  resources :users, only: [:update]

  resources :calendar_events do
    collection do
      post :multi_create
    end
  end
end
