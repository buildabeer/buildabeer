class RecipeHop < ApplicationRecord
  belongs_to :recipe
  belongs_to :hop
end
