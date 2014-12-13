class ChangeZipToInt < ActiveRecord::Migration
  def change
    change_column :killings, :location_of_killing_zip, :string
  end
end
