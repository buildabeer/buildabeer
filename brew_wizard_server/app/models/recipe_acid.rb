class RecipeAcid < ApplicationRecord
  belongs_to :recipe
  belongs_to :acid

  validates :quantity, presence: true, numericality: { greater_than_or_equal_to: 0 }
end
