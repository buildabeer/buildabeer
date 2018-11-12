class RecipeMalt < ApplicationRecord
  belongs_to :recipe
  belongs_to :malt

  @malt_usages = ["Mash", "Sparge", "Boil"]

  validates :malt_usage, presence: true, :inclusion => { :in => @malt_usages}
end
