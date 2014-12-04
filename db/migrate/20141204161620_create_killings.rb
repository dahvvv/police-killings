class CreateKillings < ActiveRecord::Migration
  def change
    create_table :killings do |t|
      t.string :victim_name
      t.integer :victim_age
      t.string :victim_gender
      t.boolean :victim_unarmed
      t.string :victim_race
      t.boolean :victim_hispanic_or_latino_origin
      t.text :url_victim_image
      t.date :date_of_killing
      t.string :agency_responsible
      t.string :officer_name
      t.text :location_of_killing_address
      t.string :location_of_killing_city
      t.string :location_of_killing_state
      t.integer :location_of_killing_zip
      t.string :location_of_killing_county
      t.string :cause_of_death
      t.text :description
      t.text :official_disposition
      t.text :source
      t.boolean :symptoms_of_mental_illness
      t.integer :shots_fired

      t.timestamps
    end
  end
end
