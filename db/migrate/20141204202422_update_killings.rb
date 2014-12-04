class UpdateKillings < ActiveRecord::Migration
  def change
    rename_column :killings, :victim_gender_m_f, :victim_gender
    change_column :killings, :victim_hispanic_or_latino_origin, :string
  end
end
