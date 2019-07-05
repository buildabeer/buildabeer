class Water < ApplicationRecord
  belongs_to :user
  has_many :recipe_water, dependent: :destroy
  has_many :recipes, :through => :recipe_water

  validates :name, presence: true, length: { maximum: 40 }
  validates :calcium, presence: true, numericality: { greater_than_or_equal_to: 0, less_than: 1000}
  validates :sulfate, presence: true, numericality: { greater_than_or_equal_to: 0, less_than: 1000}
  validates :magnesium, presence: true, numericality: { greater_than_or_equal_to: 0, less_than: 1000}
  validates :chloride, presence: true, numericality: { greater_than_or_equal_to: 0, less_than: 1000}
  validates :sodium, presence: true, numericality: { greater_than_or_equal_to: 0, less_than: 1000}
  validates :bicarbonate, presence: true, numericality: { greater_than_or_equal_to: 0, less_than: 1000}
  validates :ph, presence: true, numericality: { greater_than_or_equal_to: 0, less_than_or_equal_to: 14}
  validates :description, length: { maximum: 500 }

  def recipe_count
    return self.recipes.count
  end
end
