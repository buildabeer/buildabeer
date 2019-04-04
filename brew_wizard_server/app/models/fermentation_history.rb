class FermentationHistory < ApplicationRecord
  belongs_to :new_history

  validates :wort_quantity, numericality: { less_than: 100 }
  validates :fermentation_days, numericality: { greater_than_or_equal_to: 0 }
  validates :original_gravity, numericality: { greater_than: 1, less_than: 2 }
  validates :fermentation_temperature, numericality: { greater_than: 0, less_than: 120 }
  validates :aeration_method, length: { maximum: 20 }
  validates :aeration_minutes, numericality: { greater_than: 0, less_than: 60}
  validates :secondary_ferm_days, numericality: { greater_than: 0, less_than: 2000}
  validates :ingredient_list, length: { maximum: 5000 }
  validates :fermentation_notes, length: { maximum: 1000 }
end
