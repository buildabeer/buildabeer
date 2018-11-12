class Acid < ApplicationRecord
  has_many :recipe_acid, dependent: :destroy
  has_many :recipes, :through => :recipe_acid

  has_many :recipe_sparge_acid, dependent: :destroy
  has_many :recipes, :through => :recipe_sparge_acid

  validates :name, presence: true, length: { maximum: 40 }
  validates :description, length: { maximum: 500 }
  validates :strength, presence: true, numericality: { greater_than: 0, less_than_or_equal_to: 100}
  validates :quantity_for_normal, presence: true, numericality: { greater_than: 0, less_than_or_equal_to: 1000}
  validates :molecular_weight, presence: true, numericality: { greater_than: 0, less_than_or_equal_to: 1000}
  validates :density, presence: true, numericality: { greater_than: 0, less_than_or_equal_to: 1000}
end
