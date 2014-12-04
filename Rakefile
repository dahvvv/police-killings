require 'bundler'
Bundler.require

require 'sinatra/activerecord/rake'
require 'active_support/core_ext/string'
require_relative 'connection'


namespace :db do

  file_path_us = 'lib/U.S._Police_Shootings_Data_Responses.txt'
  us_data = File.read(file_path_us)
  us_data = us_data.split("\n")


  desc "create police_killings_db"
  task :create_db do
    conn = PG::Connection.open()
    conn.exec ('CREATE DATABASE police_killings_db;')
    conn.close
  end

  desc "drop police_killings_db"
  task :drop_db do
    conn = PG::Connection.open()
    conn.exec ('DROP DATABASE police_killings_db;')
    conn.close
  end

  desc "seed data from U.S.Police..."
  task :seed_from_us do

  end
end