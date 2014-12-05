require 'bundler'
Bundler.require

require_relative 'connection'
require_relative 'models/killing'

get '/' do
  erb :index
end

get '/console' do
  binding.pry
end

get '/api' do
  content_type :json
  killings = Killing.all
  killings.to_json
end

get '/api/show' do
  content_type :json
  victim_age = params[:victim_age]
  killing = Killing.find_by(victim_age: victim_age)
  killing.to_json
end
