class RecipeYeast < ApplicationRecord
  belongs_to :recipe
  belongs_to :yeast
end
