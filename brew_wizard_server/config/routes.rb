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

  get '/malts/names', to: 'malts#name_index'
  get '/malts/:id', to: 'malts#show'
  put '/malts/:id', to: 'malts#update'
  resources :malts

  get '/malt_types', to: 'malt_types#index'
  get '/malt_types/:id', to: 'malt_types#show'

  get '/mash_steps', to: 'mash_steps#index'
  get '/mash_steps/:id', to: 'mash_steps#show'

  get '/styles/names', to: 'styles#name_index'
  get '/styles/:id', to: 'styles#show'
  put '/styles/:id', to: 'styles#update'
  resources :styles

  get '/hops/names', to: 'hops#name_index'
  get '/hops/:id', to: 'hops#show'
  put '/hops/:id', to: 'hops#update'
  resources :hops

  get '/hop_relations', to: 'hop_relations#index'
  post '/hop_relations', to: 'hop_relations#create'
  delete '/hop_relations/:id', to: 'hop_relations#destroy'

  get '/yeast_relations', to: 'yeast_relations#index'
  post '/yeast_relations', to: 'yeast_relations#create'
  delete '/yeast_relations/:id', to: 'yeast_relations#destroy'

  get '/style_yeast_relations', to: 'style_yeast_relations#index'
  post '/style_yeast_relations', to: 'style_yeast_relations#create'
  delete '/style_yeast_relations/:id', to: 'style_yeast_relations#destroy'

  get '/miscellaneous/names', to: 'miscellaneous#name_index'
  get '/miscellaneous/:id', to: 'miscellaneous#show'
  put '/miscellaneous/:id', to: 'miscellaneous#update'
  resources :miscellaneous

  get '/yeasts/names', to: 'yeasts#name_index'
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
