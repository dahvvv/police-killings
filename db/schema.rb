# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20141206233252) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "killings", force: true do |t|
    t.string   "victim_name"
    t.integer  "victim_age"
    t.string   "victim_gender"
    t.boolean  "victim_unarmed"
    t.string   "victim_race"
    t.boolean  "victim_hispanic_or_latino_origin"
    t.text     "url_victim_image"
    t.date     "date_of_killing"
    t.string   "agency_responsible"
    t.string   "officer_name"
    t.text     "location_of_killing_address"
    t.string   "location_of_killing_city"
    t.string   "location_of_killing_state"
    t.integer  "location_of_killing_zip"
    t.string   "location_of_killing_county"
    t.string   "cause_of_death"
    t.text     "description"
    t.text     "official_disposition"
    t.text     "source"
    t.string   "symptoms_of_mental_illness"
    t.integer  "shots_fired"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "data_from"
  end

end
