Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  scope :api do
    resources :todos do
      scope module: :todos do
        resource :completions, only: [:create, :destroy]
        resource :recoveries, only: :create
      end
      resources :tomatos, only: :create
    end

    post 'signup', to: 'users#create'
    post 'signin', to: 'sessions#create'
    delete 'logout', to: 'sessions#destroy'
  end
end
