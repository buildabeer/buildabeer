class MashStep < ApplicationRecord
  validates :name, presence: true, length: { maximum: 50 }
  validates :description, presence: true, length: { maximum: 500 }
  validates :min_temp, presence: true, numericality: { greater_than: 0, less_than: :max_temp }
  validates :max_temp, presence: true, numericality: { greater_than: :min_temp, less_than_or_equal_to: 172 }
  validates :min_time, presence: true, numericality: { greater_than: 0, less_than: :max_time }
  validates :max_time, presence: true, numericality: { greater_than: :min_time, less_than_or_equal_to: 180 }
end
