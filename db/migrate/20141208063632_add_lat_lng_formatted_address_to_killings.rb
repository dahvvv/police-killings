class AddLatLngFormattedAddressToKillings < ActiveRecord::Migration
  def change
    add_column :killings, :lat, :float
    add_column :killings, :lng, :float
    add_column :killings, :formatted_address, :string
  end
end
