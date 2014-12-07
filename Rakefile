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
    us_csv = "lib/U.S._Police_Shootings_Data_Responses.csv"
    CSV.foreach(us_csv, headers: true) do |csv|
      state = (csv[2]!=nil ? csv[2][0..1] : "unknown")
      county = (csv[3]!=nil ? csv[3].downcase.gsub("county","").strip : "unknown")
      city = (csv[4]!=nil ? csv[4].downcase.strip : "unknown")
      agency = (csv[5]!=nil ? csv[5].downcase.strip : "unknown")
      agency = (csv[5]!=nil ? csv[5].downcase.strip : "unknown")
      v_name = (csv[6]!=nil ? csv[6].strip : "unknown")
      v_name = "unknown" if ["withheld","unkown","unknown","sideshow","not listed","not released"].any? { |error| v_name.downcase.include?(error) }
      v_age = csv[7].to_i
      v_age = nil if v_age == 0
      v_gender = (csv[8]!=nil ? csv[8].downcase : "unknown")
      v_race = (csv[9]!=nil ? csv[9].downcase : "unknown")
      if csv[10]
        v_hisp=true if csv[10].downcase=="hispanic or latino origin"
        v_hisp=false if csv[10].downcase=="not of hispanic or latino origin"
      end
      shots = (csv[11]!=nil ? csv[11].to_i : nil)
      unarmed = (csv[13]!=nil ? (csv[13].downcase == "unarmed") : nil)
      description = (csv[15]!=nil ? csv[15].gsub("’","'") : "unknown")
      source = (csv[16]!=nil ? csv[16].strip : "unknown")

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
        shots_fired: shots,
        source: source,
        url_victim_image: "unknown",
        data_from:  "U.S. Police Shootings Data"
        )
    end
  end

  desc "seed data from Fatal_Encounters.csv"
  task :seed_from_fe do
  fe_csv = "lib/Fatal_Encounters.csv"
  male_typos = ["maale",",male","m","ma;e","white"]
  CSV.foreach(fe_csv, headers: true) do |csv|
      v_name = csv[2]
      v_name = "unknown" if ["unnamed","unknown","unidentified","withheld"].any? { |error| v_name.downcase.include?(error) }
      v_age = csv[3].to_i
      v_age = nil if v_age == 0
      v_gender = (csv[4]!=nil ? csv[4].downcase : "unknown")
      v_gender = "male" if male_typos.include?(v_gender)
      v_race = (csv[5]!=nil ? csv[5].downcase : "unknown")
      v_race = v_race.gsub("european american","european-american").gsub("hispanic/latin","hispanic-latin").gsub("eureopean","european")
      v_race = "unknown" if ["unreported","unknown"].any? { |error| v_race.include?(error) }
      url_img = (csv[6]!=nil ? csv[6] : "unknown")
      if (url_img.length < 3) || (url_img.length > 2000)
        url_img = "unknown"
      end
      date = (csv[7]!=nil ? csv[7] : "unknown")
      address = (csv[8]!=nil ? csv[8] : "unknown")
      city = csv[9].downcase.strip
      state = csv[10]
      state = "WA" if state == "Washington"
      zip = (csv[11]!=nil ? csv[11].to_i : nil)
      county = (csv[12]!=nil ? csv[12].downcase.gsub("county","").strip : "unknown")
      agency = (csv[13]!=nil ? csv[13].downcase.strip : "unknown")
      agency = "unknown" if agency[0..3].downcase == "http"
      cause = (csv[14]!=nil ? csv[14].capitalize : "unknown")
      description = (csv[15]!=nil ? csv[15].gsub("’","'") : "unknown")
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
