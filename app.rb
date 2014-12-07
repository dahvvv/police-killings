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

get '/api/killings' do
  content_type :json
  killings = Killing.all
  killings.to_json
end

get '/api/killings/:id' do
  content_type :json
  killing = Killing.find(params[:id])
  killing.to_json
end

get '/api/state/:state' do
  content_type :json
  killings = Killing.where("location_of_killing_state = ?", params[:state])
  killings.to_json
end


# get '/api/games/state/:state' do
#   content_type :json
#   games = Game.possible_ends_for(params[:state])
#   games = games.where({complete: params[:complete]}) if params[:complete]
#   games = games.where({winner: params[:winner]}) if params[:winner]
#   games.to_json
# end

#   def self.possible_ends_for(state)
#     self.where("state LIKE '#{state.gsub(/-/, "%")}'").order("LENGTH(turns)")
#   end
