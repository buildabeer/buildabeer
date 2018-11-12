class MaltType < ApplicationRecord
  @malt_types = ["Grain", "Extract", "Dry Extract", "Sugar", "Adjunct"]

  has_many :malts, dependent: :destroy

  validates :name, presence: true, :inclusion => { :in => @malt_types}
end
