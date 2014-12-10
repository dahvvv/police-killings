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
    CSV.foreach(us_csv, headers: false) do |csv|
      state = (csv[2]!=nil ? csv[2][0..1] : "unknown")
      county = (csv[3]!=nil ? csv[3].downcase.gsub("county","").strip : "unknown")
      city = (csv[4]!=nil ? csv[4].downcase.strip.gsub("’","'") : "unknown")
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
    CSV.foreach(fe_csv, headers: false) do |csv|
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
      address = (csv[8]!=nil ? csv[8].gsub("’","'") : "unknown")
      city = csv[9].downcase.strip.gsub("’","'")
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

  def urlencode(x)
    return x.gsub(" ","%20").gsub("!","%21").gsub('"',"%22").gsub("#","%23").gsub("$","%24").gsub("&","%26").gsub("'","%27").gsub("(","%28").gsub(")","%29").gsub("*","%2A").gsub("-","%2D").gsub("/","%2F").gsub(":","%3A").gsub(";","%3B").gsub("<","%3C").gsub("=","%3D").gsub(">","%3E").gsub("?","%3F").gsub("@","%40").gsub("[","%5B").gsub("]","%5D").gsub("^","%5E").gsub("_","%5F")
  end

  desc "geocode fe lat/lng/formatted address to csv"
  task :geocode_fe do
    i = 0
    data = []
    fe_csv = "lib/Fatal_Encounters.csv"
    CSV.foreach(fe_csv, headers: false) do |csv|
      # enter the boundaries to specify which rows you want to geocode:
      if i>=2900 && i<2918
        address = (csv[8]!=nil ? csv[8] : "")
        city = csv[9].downcase.strip
        state = csv[10]
        state = "WA" if state == "Washington"
        zip = (csv[11]!=nil ? csv[11].to_i : "")
        zip = "" if zip.to_s.length != 5
        full_address = "#{address},+#{city},+#{state},+#{zip}"
        encoded_address = urlencode(full_address).gsub("%20","+")
        query = "https://maps.googleapis.com/maps/api/geocode/json?address=#{encoded_address}&key=#{ENV['GEOCODE']}"
        response = HTTParty.get(query)
        formatted_address = response["results"][0]["formatted_address"]
        lat = response["results"][0]["geometry"]["location"]["lat"]
        lng = response["results"][0]["geometry"]["location"]["lng"]
        data.push([formatted_address,lat,lng])
        sleep 5
      end
      i += 1
    end
    fe_csv_2 = "lib/Fatal_Encounters_2.csv"
    CSV.open(fe_csv_2, "a") do |csv|
      data.each do |arr|
        csv << arr
      end
    end
  end

  desc "seed data from Fatal_Encounters_2.csv"
  task :seed_from_fe_2 do
    fe_csv_2 = "lib/Fatal_Encounters_2.csv"
    i = 1
    CSV.foreach(fe_csv_2, headers: false) do |csv|
      formatted_address = csv[0]
      lat = csv[1]
      lng = csv[2]
      killing = Killing.find(i)
      killing.update({
        formatted_address: formatted_address,
        lat: lat,
        lng: lng
        })
      killing.save!
      i+=1
    end
  end

  desc "seed into Data.csv"
  task :seed_into_data do
    data = "lib/Data.csv"
    #set bounds of how many you wanna seed at a time
    killings = Killing.where("id >= 0 AND id < 5000")
    CSV.open(data, "a") do |csv|
      killings.each do |killing|
        arr = []
        arr.push(killing.victim_name)
        arr.push(killing.victim_age)
        arr.push(killing.victim_race)
        arr.push(killing.victim_gender)
        arr.push(killing.date_of_killing)
        arr.push(killing.description)
        arr.push(killing.shots_fired)
        arr.push(killing.victim_unarmed)
        arr.push(killing.symptoms_of_mental_illness)
        arr.push(killing.lat)
        arr.push(killing.lng)
        arr.push(killing.formatted_address)
        arr.push(killing.location_of_killing_city)
        arr.push(killing.location_of_killing_state)
        arr.push(killing.location_of_killing_zip)
        arr.push(killing.location_of_killing_county)
        arr.push(killing.url_victim_image)
        arr.push(killing.source)
        arr.push(killing.data_from)
        csv << arr
      end
    end
  end
end
