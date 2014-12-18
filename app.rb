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

get '/api/killings/state/:state' do
  content_type :json
  killings = Killing.where("location_of_killing_state = ?", params[:state])
  killings.to_json
end

get '/api/killings/armed_or_unarmed' do
  content_type :json
  Killing.where.not(victim_unarmed: nil).to_json
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



# get '/api/killings/race' do
#   content_type :json
#   Killing.where.not(victim_race: nil).to_json
# end


# okay this is embarrassing but I'm really stressed for time aaahhh
# get '/api/killings/race/one/:one/two/:two/three/:three/four/:four/five/:five/six/:six' do
#   binding.pry
#   content_type :to_json
#   one = params[:one]
#   two = params[:two]
#   three = params[:three]
#   four = params[:four]
#   five = params[:five]
#   six = params[:six]
#   races = [one,two,three,four,five,six]
#   races.map! do |race|
#     if race == "alaskan"
#       "alaskan and/or pacific islander"
#     elsif race == "hispanic"
#       "hispanic and/or latin"
#     else
#       race
#     end
#   end
#   binding.pry
#   Killing.where("victim_race = ? OR victim_race = ? OR victim_race = ? OR victim_race = ? OR victim_race = ? OR victim_race = ?", races[0], races[1], races[2], races[3], races[4], races[5]).to_json
# end

# get '/api/killings/race/one/:one/two/:two/three/:three/four/:four/five/:five' do
#   binding.pry
#   content_type :to_json
#   one = params[:one]
#   two = params[:two]
#   three = params[:three]
#   four = params[:four]
#   five = params[:five]
#   races = [one,two,three,four,five]
#   races.map! do |race|
#     if race == "alaskan"
#       "alaskan and/or pacific islander"
#     elsif race == "hispanic"
#       "hispanic and/or latin"
#     else
#       race
#     end
#   end
#   binding.pry
#   Killing.where("victim_race = ? OR victim_race = ? OR victim_race = ? OR victim_race = ? OR victim_race = ?", races[0], races[1], races[2], races[3], races[4]).to_json
# end

# get '/api/killings/race/one/:one/two/:two/three/:three/four/:four' do
#   content_type :to_json
#   one = params[:one]
#   two = params[:two]
#   three = params[:three]
#   four = params[:four]
#   races = [one,two,three,four]
#   races.map! do |race|
#     if race == "alaskan"
#       "alaskan and/or pacific islander"
#     elsif race == "hispanic"
#       "hispanic and/or latin"
#     else
#       race
#     end
#   end
#   Killing.where("victim_race = ? OR victim_race = ? OR victim_race = ? OR victim_race = ?", races[0], races[1], races[2], races[3]).to_json
# end

# get '/api/killings/race/one/:one/two/:two/three/:three' do
#   content_type :to_json
#   one = params[:one]
#   two = params[:two]
#   three = params[:three]
#   races = [one,two,three]
#   races.map! do |race|
#     if race == "alaskan"
#       "alaskan and/or pacific islander"
#     elsif race == "hispanic"
#       "hispanic and/or latin"
#     else
#       race
#     end
#   end
#   Killing.where("victim_race = ? OR victim_race = ? OR victim_race = ?", races[0], races[1], races[2]).to_json
# end

# get '/api/killings/race/one/:one/two/:two' do
#   content_type :to_json
#   one = params[:one]
#   two = params[:two]
#   races = [one,two]
#   races.map! do |race|
#     if race == "alaskan"
#       "alaskan and/or pacific islander"
#     elsif race == "hispanic"
#       "hispanic and/or latin"
#     else
#       race
#     end
#   end
#   Killing.where("victim_race = ? OR victim_race = ?", races[0], races[1]).to_json
# end

# get '/api/killings/race/one/:one' do
#   content_type :to_json
#   one = params[:one]
#   if one == "alaskan"
#     one = "alaskan and/or pacific islander"
#   elsif one == "hispanic"
#     one = "hispanic and/or latin"
#   end
#   Killing.where("victim_race = ?", one).to_json
# end