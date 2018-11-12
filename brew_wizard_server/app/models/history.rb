class History < ApplicationRecord
  belongs_to :user

  validates :og, allow_nil: true, numericality: { greater_than_or_equal_to: 0, less_than: 2.5}
  validates :fg, allow_nil: true, numericality: { greater_than_or_equal_to: 0, less_than: 2.5}
  validates :gallons, allow_nil: true, numericality: { greater_than_or_equal_to: 0, less_than: 100}
  validates :ingredients, length: { maximum: 2500 }
  validates :notes, length: { maximum: 5000 }
  validates :recipe_name, presence: true, length: { maximum: 100 }
  validates :recipe_id, allow_nil: true, numericality: { greater_than_or_equal_to: 0, less_than: 100}
  validates :brew_date, presence: true, length: { maximum: 1000 }
end
