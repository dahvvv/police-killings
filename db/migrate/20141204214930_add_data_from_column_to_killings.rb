class AddDataFromColumnToKillings < ActiveRecord::Migration
  def change
    add_column :killings, :data_from, :string
  end
end
