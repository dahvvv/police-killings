require 'bundler'
Bundler.require

require 'sinatra/activerecord/rake'
require 'active_support/core_ext/string'
require 'csv'
require_relative 'connection'
require_relative 'models/killing'


namespace :db do

  def urlencode(str)
    return str.gsub(" ","%20").gsub("!","%21").gsub('"',"%22").gsub("#","%23").gsub("$","%24").gsub("&","%26").gsub("'","%27").gsub("(","%28").gsub(")","%29").gsub("*","%2A").gsub("-","%2D").gsub("/","%2F").gsub(":","%3A").gsub(";","%3B").gsub("<","%3C").gsub("=","%3D").gsub(">","%3E").gsub("?","%3F").gsub("@","%40").gsub("[","%5B").gsub("]","%5D").gsub("^","%5E").gsub("_","%5F")
  end

  alaskan_pac_isl_subs = ["alaskan and/or pacific islander","native american/alaskan","american indian or alaska native","pacific islander","native hawaiian or other pacific islander","native american"]
  asian_subs = ["asian"]
  black_subs = ["black","black or african american","african-american/black","african-american","african american/black","african-american/black, sudanese"]
  hispanic_latin_subs = ["hispanic and/or latin","hispanic-latina","hispanic-latino/latino","hispanic-latino","hispanic/latin","hispanic-latin"]
  white_subs = ["white","european-american","white","european-american/white","european american"]
  other_subs = ["other","mixed","middle eastern","haitian-american","european-american/white, african-american/black, mixed","european-american/white, hispanic-latino","european-american/white, pacific islander" "european-american/white, asian, mixed"]
  race_multiarr = [alaskan_pac_isl_subs, asian_subs, black_subs, hispanic_latin_subs, white_subs, other_subs]

  def racial_term_substitution(term, race_multiarr)
    chosen_term = nil
    race_multiarr.each do |race_subs|
      chosen_term = race_subs[0] if race_subs.any? { |sub| term.downcase.include?(sub) }
    end
    return chosen_term
  end

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

  desc "geocode f_e_scraped into a csv"
  task :geocode_fe do
    i = 0
    data = []
    fe_csv = "lib/Fatal_Encounters_Scraped.csv"
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
    fe_csv_2 = "lib/Fatal_Encounters_Geocodes.csv"
    CSV.open(fe_csv_2, "a") do |csv|
      data.each do |arr|
        csv << arr
      end
    end
  end

  desc "geocode us_scraped into a csv"
  task :geocode_us do
    i = 0
    data = []
    path1 = "lib/U.S._Police_Shootings_Scraped.csv"
    path2 = "lib/U.S._Police_Shootings_Geocodes.csv"
    CSV.open(path2, "a") do |csv2|
      CSV.foreach(path1, headers: false) do |csv1|
        # enter the boundaries to specify which rows you want to geocode:
        if i>=1600 && i<1659
          state = (csv1[2]!=nil ? csv1[2][0..1]+"+" : "")
          city = (csv1[4]!=nil ? csv1[4].downcase.strip.gsub("’","'") : "")+(",+")
          county = (csv1[3]!=nil ? ",+"+csv1[3].downcase.strip : "")
          full_address = "#{city}#{state}#{county}"
          encoded_address = urlencode(full_address).gsub("%20","+")
          query = "https://maps.googleapis.com/maps/api/geocode/json?address=#{encoded_address}&key=#{ENV['GEOCODE']}"
          response = HTTParty.get(query)
          formatted_address = response["results"][0]["formatted_address"]
          lat = response["results"][0]["geometry"]["location"]["lat"]
          lng = response["results"][0]["geometry"]["location"]["lng"]
          csv2 << [formatted_address,lat,lng]
          sleep 2
        end
        i += 1
      end
    end
  end

  desc "combine scraped data with geocodes into a master csv"
  task :data_into_master_csv do
    path1 = "lib/Fatal_Encounters_Scraped.csv"
    path2 = "lib/Fatal_Encounters_Geocodes.csv"
    path3 = "lib/U.S._Police_Shootings_Scraped.csv"
    path4 = "lib/U.S._Police_Shootings_Geocodes.csv"
    path5 = "lib/Complete_Data.csv"
    f_e_combined = []
    CSV.foreach(path1, headers: false) do |csv1_row|
      reordered_row = csv1_row[2...19].push([nil,nil,"Fatal Encounters"]).flatten
      f_e_combined.push(reordered_row)
    end
    i = 0
    CSV.foreach(path2, headers: false) do |csv2_row|
      csv2_row.each do |csv2_el|
        f_e_combined[i].push(csv2_el)
      end
      i += 1
    end
    u_s_combined = []
    CSV.foreach(path3, headers: false) do |csv3_row|
      reordered_row = [csv3_row[6],csv3_row[7],csv3_row[8],csv3_row[9],nil,nil,nil,csv3_row[4],csv3_row[2],nil,csv3_row[3],csv3_row[5],nil,csv3_row[15],nil,csv3_row[16],nil,csv3_row[11],csv3_row[13],"U.S. Police Shootings"]
      u_s_combined.push(reordered_row)
    end
    i = 0
    CSV.foreach(path4, headers: false) do |csv4_row|
      csv4_row.each do |csv4_el|
        u_s_combined[i].push(csv4_el)
      end
      i += 1
    end
    all_data = f_e_combined + u_s_combined
    CSV.open(path5, "a") do |master_csv|
      all_data.each do |row|
        master_csv << row
      end
    end
  end

  desc "seed data from Complete_Data.csv"
  task :seed_from_master do
    path = "lib/Complete_Data.csv"
    male_typos = ["maale",",male","m","ma;e","white"]
    CSV.foreach(path, headers: true) do |csv|
      v_name = csv[0]
      if v_name
        v_name = nil if ["unnamed","unkown","unknown","unidentified","withheld","name undisclosed by police","sideshow","not listed","not released","un","unnamed minor","unreleased"].any? { |error| v_name.downcase.include?(error) }
      end
      v_age = csv[1].to_i
      v_age = nil if v_age == 0
      v_gender = (csv[2]!=nil ? csv[2].downcase : nil)
      v_gender = "male" if male_typos.include?(v_gender)
      v_race = csv[3] == nil ? nil : racial_term_substitution(csv[3], race_multiarr)
      url_img = (csv[4]!=nil ? csv[4] : nil)
      if url_img
        if (url_img.length < 3) || (url_img.length > 2000)
          url_img = nil
        end
      end
      date = csv[5]!=nil ? csv[5] : nil
      address = (csv[6]!=nil ? csv[6].gsub("’","'") : nil)
      city = csv[7]!=nil ? csv[7].downcase.strip.gsub("’","'") : nil
      if city
        city = "new york city" if ["brooklyn","queens","bronx","staten island","new york","nyc"].any? { |borough| city.include?(borough) }
      end
      state = csv[8]!=nil ? csv[8][0..1] : nil
      state = "WA" if state == "Washington"
      zip = csv[9]
      county = csv[10]!=nil ? csv[10].downcase.gsub("county","").strip : nil
      agency = csv[11]!=nil ? csv[11].downcase.strip : nil
      if agency
        agency = nil if agency[0..3] == "http"
      end
      cause = csv[12]!=nil ? csv[12].capitalize : nil
      description = csv[13]!=nil ? csv[13].gsub("’","'") : nil
      disposition = csv[14]!=nil ? csv[14].downcase : nil
      if csv[15]==nil || (csv[15].strip[0..3]!="http" && csv[15].strip[0..2]!="www")
        source = nil
      else
        source = csv[15].strip
      end
      illness = csv[16]!=nil ? csv[16].downcase : nil
      illness = nil if illness != "yes" && illness != "no"
      shots = csv[17]!=nil ? csv[17].to_i : nil
      unarmed = csv[18]!=nil ? (csv[18].downcase == "unarmed") : nil
      data_from = csv[19]
      formatted_address = csv[20]
      lat = csv[21]
      lon = csv[22]

      Killing.create(
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
        shots_fired: shots,
        victim_unarmed: unarmed,
        data_from: data_from,
        formatted_address: formatted_address,
        lat: lat,
        lng: lon
        )
    end
  end

  desc "copy db back to csv to avoid duplicates"
  task :db_to_csv do
    killings = Killing.order("id")
    path = "lib/Complete_Data_No_Duplicates.csv"
    CSV.open(path, "a") do |csv|
      killings.each do |killing|
        arr = []
        arr.push(killing.victim_name)
        arr.push(killing.victim_age)
        arr.push(killing.victim_gender)
        arr.push(killing.victim_race)
        arr.push(killing.url_victim_image)
        arr.push(killing.date_of_killing)
        arr.push(killing.location_of_killing_address)
        arr.push(killing.location_of_killing_city)
        arr.push(killing.location_of_killing_state)
        arr.push(killing.location_of_killing_zip)
        arr.push(killing.location_of_killing_county)
        arr.push(killing.agency_responsible)
        arr.push(killing.cause_of_death)
        arr.push(killing.description)
        arr.push(killing.official_disposition)
        arr.push(killing.source)
        arr.push(killing.symptoms_of_mental_illness)
        arr.push(killing.shots_fired)
        arr.push(killing.victim_unarmed)
        arr.push(killing.data_from)
        arr.push(killing.formatted_address)
        arr.push(killing.lat)
        arr.push(killing.lng)
        csv << arr
      end
    end
  end

end

# def us_pop_by_age(i)
#   if i <= 4
#     return 1.3
#   elsif i <= 9
#     return 1.32
#   elsif i <= 14
#     return 1.34
#   elsif i <= 19
#     return 1.38
#   elsif i <= 24
#     return 1.42
#   elsif i <= 29
#     return 1.36
#   elsif i <= 34
#     return 1.32
#   elsif i <= 39
#     return 1.24
#   elsif i <= 44
#     return 1.34
#   elsif i <= 49
#     return 1.4
#   elsif i <= 54
#     return 1.44
#   elsif i <= 59
#     return 1.32
#   elsif i <= 64
#     return 1.14
#   elsif i <= 69
#     return 0.88
#   elsif i <= 74
#     return 0.64
#   elsif i <= 79
#     return 0.48
#   elsif i <= 84
#     return 0.38
#   else
#     return 0.3
#   end
# end

# def percent_arrests_by_age(i)
#   if i <= 10
#     return 0.02
#   elsif i <= 15
#     return 1.3
#   elsif i <= 20
#     return 4.4
#   elsif i <= 25
#     return 3.8
#   elsif i <= 30
#     return 2.9
#   elsif i <= 35
#     return 2.2
#   elsif i <= 40
#     return 1.5
#   elsif i <= 45
#     return 1.3
#   elsif i <= 50
#     return 1.1
#   elsif i <= 55
#     return 0.8
#   elsif i <= 60
#     return 0.4
#   elsif i <= 65
#     return 0.2
#   else
#     return 0.01
#   end
# end

# def percent_homs_by_age(i)
#   if i < 10
#     return 0.01
#   elsif i <= 12
#     return 0.2
#   elsif i <= 14
#     return 1.0
#   elsif i == 15
#     return 1.8
#   elsif i == 16
#     return 2.3
#   elsif i == 17
#     return 2.8
#   elsif i == 18
#     return 3.7
#   elsif i == 19
#     return 4.1
#   elsif i == 20
#     return 4.2
#   elsif i == 21
#     return 4.2
#   elsif i == 22
#     return 4.1
#   elsif i == 23
#     return 3.9
#   elsif i == 24
#     return 3.7
#   elsif i <= 29
#     return 3.2
#   elsif i <= 34
#     return 2.5
#   elsif i <= 39
#     return 1.8
#   elsif i <= 44
#     return 1.5
#   elsif i <= 49
#     return 1.3
#   elsif i <= 54
#     return 1.1
#   elsif i <= 59
#     return 0.6
#   elsif i <= 64
#     return 0.3
#   else
#     return 0.01
#   end
# end

# def percent_in_poverty_by_age(i)
#   if i <= 4
#     return 3.0
#   elsif i <= 9
#     return 5.02
#   elsif i <= 14
#     return 4.68
#   elsif i <= 19
#     return 3.98
#   elsif i <= 24
#     return 4.26
#   elsif i <= 29
#     return 3.36
#   elsif i <= 34
#     return 2.98
#   elsif i <= 39
#     return 2.7
#   elsif i <= 44
#     return 2.2
#   elsif i <= 49
#     return 2.24
#   elsif i <= 54
#     return 2.12
#   elsif i <= 59
#     return 2.14
#   elsif i <= 64
#     return 2.16
#   elsif i <= 69
#     return 1.5
#   elsif i <= 74
#     return 1.46
#   elsif i <= 79
#     return 2.0
#   elsif i <= 84
#     return 2.0
#   else
#     return 2.3
#   end
# end

# path = "lib/column_weights/ages_data.csv"
# age = 1
# total = 0.0
# CSV.open(path, "a") do |csv|
#   (1..107).each do |i|
#     pop = us_pop_by_age(i)
#     arrests = percent_arrests_by_age(i)
#     homs = percent_homs_by_age(i)
#     pov = percent_in_poverty_by_age(i)
#     csv << [i,pop,arrests,homs,pov]
#   end
# end
