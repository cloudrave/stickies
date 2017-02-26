Rails.application.routes.draw do
  get '/', to: 'home#show'
  root 'home#show'
end
