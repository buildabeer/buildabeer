class RecipeMash < ApplicationRecord
  belongs_to :recipe
  belongs_to :mash_step
end
