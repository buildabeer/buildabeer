class BoilHistory < ApplicationRecord
  belongs_to :new_histories

  validates :pre_boil_gravity, numericality: { greater_than_or_equal_to: 1, less_than: 2 }
  validates :pre_boil_quantity, numericality: { greater_than: 0, less_than: 100 }
  validates :boil_minutes, numericality: { greater_than: 0, less_than: 180 }
  validates :ingredient_list, length: { maximum: 5000 }
  validates :gravity_additions, length: { maximum: 500 }
  validates :boil_notes, length: { maximum: 1000 }
end
