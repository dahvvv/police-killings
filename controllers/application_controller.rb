class ApplicationController < Sinatra::Base

  set :views, File.expand_path("../../views", __FILE__)
  set :public_folder, File.expand_path("../../public_folder", __FILE__)

  get '/' do
    erb :index
  end

  get '/console' do
    binding.pry
  end

end