class ChillHistory < ApplicationRecord
  belongs_to :new_history

  validates :chill_method, length: { maximum: 100 }
  validates :chill_minutes, length: { maximum: 20 }
  validates :ingredient_list, length: { maximum: 5000 }
  validates :chill_notes, length: { maximum: 1000 }
end
