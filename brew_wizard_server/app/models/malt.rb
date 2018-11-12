class Malt < ApplicationRecord
  belongs_to :malt_type
  belongs_to :user
  has_many :recipe_malt
  has_many :recipes, :through => :recipe_malt

  validates :name, presence: true, length: { maximum: 40 }
  validates :malt_type_id, presence: true
  validates :origin, length: { maximum: 50 }
  validates :color, presence: true, numericality: { less_than: 1000 }
  validates :malt_yield, presence: true, numericality: { greater_than_or_equal_to: 0, less_than_or_equal_to: 100 }
  validates :diastatic_power, presence: true, numericality: { greater_than_or_equal_to: 0, less_than: 1000 }
  validates :protein, presence: true, numericality: { greater_than_or_equal_to: 0, less_than: 1000 }
  validates :max_percent, presence: true, numericality: { greater_than_or_equal_to: 0, less_than_or_equal_to: 100 }
  validates :description, length: { maximum: 500 }

  def recipe_count
    return self.recipes.count
  end
end
