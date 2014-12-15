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

get '/api/killings/name/:name' do
  content_type :json
  killings = Killing.where("victim_name = ?", params[:name])
  killings.to_json
end

get '/api/killings/gender/:gender' do
  content_type :json
  killings = Killing.where("victim_gender = ?", params[:gender])
  killings.to_json
end

get '/api/killings/state/:state' do
  content_type :json
  killings = Killing.where("location_of_killing_state = ?", params[:state])
  killings.to_json
end

get '/api/killings/armed_or_unarmed' do
  content_type :json
  Killing.where("victim_unarmed = 'true' OR victim_unarmed = 'false'").to_json
end

get "/api/killings/victim_age/min/:min/max/:max" do
  content_type :json
  Killing.where("victim_age >= ? AND victim_age <= ?", params[:min], params[:max]).to_json
end

get '/api/killings/victim_age' do
  content_type :json
  Killing.where("victim_age > '0'").to_json
end

get '/api/killings/:id' do
  content_type :json
  Killing.find(params[:id]).to_json
end

get '/api/killings' do
  content_type :json
  Killing.all.to_json
end

# class MarketsController < ApplicationController
#   def index
#     markets = Market.open_on(options["day"]).located_in(options["borough"])
#     render json: markets
#   end

#   private

#   def options
#     defaults.merge(params)
#   end

#   def defaults
#     {"day" => "", "borough" => ""}
#   end
# end





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
