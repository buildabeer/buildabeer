class MashStepHistory < ApplicationRecord
  belongs_to :mash_histories

  validates :mash_history_id
  validates :step_counter, numericality: { greater_than: 0, less_than: 10 }
  validates :step_temperature, numericality: { greater_than: 0, less_than: 200 }
  validates :step_minutes, numericality: { greater_than: 0, less_than_or_equal_to: 120 }
  validates :step_water_temperature, numericality: { greater_than: 0, less_than: 200 }
  validates :step_water_quantity, numericality: { greater_than: 0, less_than: 100 }
end
