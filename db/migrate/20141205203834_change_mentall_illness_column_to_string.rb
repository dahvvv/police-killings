class ChangeMentallIllnessColumnToString < ActiveRecord::Migration
  def change
    change_column :killings, :symptoms_of_mental_illness, :string
  end
end
