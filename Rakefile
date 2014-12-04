require 'bundler'
Bundler.require

require 'sinatra/activerecord/rake'
require 'active_support/core_ext/string'
require_relative 'connection'
require_relative 'models/killing'


namespace :db do

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
    file_path_us = 'lib/U.S._Police_Shootings_Data_Responses.txt'
    us_txt = File.read(file_path_us)
    us_arr = us_txt.split(/\n\d+\/\d+\/\d+.+,[A-Z]{2}\s-\s/)
    us_arr.each do |str|
      comma_sep = str.split(",")
      state = comma_sep[0]
      county = comma_sep[1]
      city = comma_sep[2]
      agency = comma_sep[3]
      v_name = comma_sep[4]
      v_age = comma_sep[5]
      v_gender = comma_sep[6]
      v_race = comma_sep[7]
      v_hisp = comma_sep[8]
      shots = comma_sep[9]
      unarmed = (comma_sep[11].downcase == "unarmed")
      link_idx = comma_sep.index {|x| x.include?("http")}
      description = comma_sep[13..link_idx].join.split("http")[0]
      end_of_desc = description[-15..-1]
      links = comma_sep[13..link_idx].join.split(end_of_desc)[1] || ""
      comma_sep.select {|x| x[0..3]=="http"}.each do |link|
        links += " " + link
      end

      Killing.create!(
        victim_name: v_name,
        victim_age: v_age,
        victim_gender: v_gender,
        victim_unarmed: unarmed,
        victim_race: v_race,
        victim_hispanic_or_latino_origin: v_hisp,
        agency_responsible: agency,
        location_of_killing_city: city,
        location_of_killing_state: state,
        location_of_killing_county: county,
        description: description,
        source: links,
        data_from:  "U.S. Police Shootings Data"
        )
    end
  end
end

# us: Timestamp,Date Searched,State,County,City,Agency Name,Victim Name,Victim's Age,Victim's Gender,Race,Hispanic or Latino Origin,Shots Fired,Hit or Killed?,Armed or Unarmed?,Weapon,Summary,Source Link,Name of Officer or Officers,Shootings,Was the Shooting Justified?,Receive Updates?,Name,Email Address,Twitter,Date of Incident,Results Page Number