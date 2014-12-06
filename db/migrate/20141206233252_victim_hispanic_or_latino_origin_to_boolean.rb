class VictimHispanicOrLatinoOriginToBoolean < ActiveRecord::Migration
  def change
    change_column :killings, :victim_hispanic_or_latino_origin, 'boolean USING CAST(victim_hispanic_or_latino_origin AS boolean)'
  end
end
