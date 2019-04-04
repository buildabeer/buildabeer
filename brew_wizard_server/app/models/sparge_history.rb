class SpargeHistory < ApplicationRecord
  belongs_to :new_history

  validates :sparge_temperature, numericality: { greater_than: 0, less_than: 200 }
  validates :sparge_quantity, numericality: { greater_than: 0, less_than: 100 }
  validates :ingredient_list, length: { maximum: 5000 }
  validates :sparge_notes, length: { maximum: 1000 }
end
