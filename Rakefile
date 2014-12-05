require 'bundler'
Bundler.require

require 'sinatra/activerecord/rake'
require 'active_support/core_ext/string'
require 'csv'
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

  desc "seed data from Fatal_Encounters.csv"
  task :load_fe_csv do
  fe_csv = "lib/Fatal_Encounters.csv"
  male_typos = ["Maale","male",",Male","M","Ma;e","White"]
  CSV.foreach(fe_csv, headers: true) do |csv|
      v_name = csv[2]
      v_age = csv[3].to_i
      v_age = nil if v_age == 0
      v_gender = csv[4]
      v_gender = "Male" if male_typos.include?(v_gender)
      v_gender = "Unknown" if v_gender == nil
      v_race = csv[5]
      v_race = "Unknown" if v_race == nil || ["unknown","unreported"].any? { |error| v_race.downcase.include?(error) }
      url_img = (csv[6]!=nil ? csv[6] : "Unknown")
      if (url_img.length < 3) || (url_img.length > 2000)
        url_img = "Unknown"
      end
      date = (csv[7]!=nil ? csv[7] : "Unknown")
      address = (csv[8]!=nil ? csv[8] : "Unknown")
      city = csv[9]
      state = csv[10]
      zip = (csv[11]!=nil ? csv[11].to_i : nil)
      county = (csv[12]!=nil ? csv[12] : "Unknown")
      agency = (csv[13]!=nil ? csv[13].capitalize : "Unknown")
      agency = "Unknown" if agency[0..3].downcase == "http"
      cause = (csv[14]!=nil ? csv[14].capitalize : "Unknown")
      description = (csv[15]!=nil ? csv[15].gsub("’","'") : "Unknown")
      disposition = (csv[16]!=nil ? csv[16].downcase : "unknown")
      if csv[17]==nil || (csv[17][0..3]!="http" && csv[17][0..2]!="www")
        source = "unknown"
      else
        source = csv[17]
      end
      illness = (csv[18]!=nil ? csv[18].downcase : "unknown")
      date = /^\d+\/\d+\/\d+/.match(csv[21]).to_s

      Killing.create!(
        victim_name: v_name,
        victim_age: v_age,
        victim_gender: v_gender,
        victim_race: v_race,
        url_victim_image: url_img,
        date_of_killing: date,
        location_of_killing_address: address,
        location_of_killing_city: city,
        location_of_killing_state: state,
        location_of_killing_zip: zip,
        location_of_killing_county: county,
        agency_responsible: agency,
        cause_of_death: cause,
        description: description,
        official_disposition: disposition,
        source: source,
        symptoms_of_mental_illness: illness,
        date_of_killing: date,
        data_from:  "Fatal Encounters Database"
        )
    end
  end
end

# us: Timestamp,Date Searched,State,County,City,Agency Name,Victim Name,Victim's Age,Victim's Gender,Race,Hispanic or Latino Origin,Shots Fired,Hit or Killed?,Armed or Unarmed?,Weapon,Summary,Source Link,Name of Officer or Officers,Shootings,Was the Shooting Justified?,Receive Updates?,Name,Email Address,Twitter,Date of Incident,Results Page Number
