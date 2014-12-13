class Killing < ActiveRecord::Base
  validates :victim_name, uniqueness: true
end
