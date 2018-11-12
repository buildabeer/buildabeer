class Style < ApplicationRecord
  belongs_to :user
  has_many :recipes
  has_many :style_yeasts, dependent: :destroy
  has_many :yeasts, :through => :style_yeasts
  belongs_to :water_profile

  validates :name, presence: true, length: { maximum: 40 }
  validates :category_name, length: { maximum: 40 }
  validates :category_number, numericality: { greater_than: 0, less_than: 100}
  validates :subcategory, length: { maximum: 1 }
  validates :style_type, presence: true, length: { maximum: 40 }
  validates :min_og, presence: true, numericality: { greater_than_or_equal_to: 0, less_than: 2}
  validates :max_og, presence: true, numericality: { greater_than_or_equal_to: 0, less_than: 2}
  validates :min_fg, presence: true, numericality: { greater_than_or_equal_to: 0, less_than: 2}
  validates :max_fg, presence: true, numericality: { greater_than_or_equal_to: 0, less_than: 2}
  validates :min_ibu, presence: true, numericality: { greater_than_or_equal_to: 0, less_than: 200}
  validates :max_ibu, presence: true, numericality: { greater_than_or_equal_to: 0, less_than: 200}
  validates :min_carb, presence: true, numericality: { greater_than_or_equal_to: 0, less_than: 5}
  validates :max_carb, presence: true, numericality: { greater_than_or_equal_to: 0, less_than: 5}
  validates :min_color, presence: true, numericality: { greater_than_or_equal_to: 0, less_than: 100}
  validates :max_color, presence: true, numericality: { greater_than_or_equal_to: 0, less_than: 100}
  validates :min_abv, presence: true, numericality: { greater_than_or_equal_to: 0, less_than: 20}
  validates :max_abv, presence: true, numericality: { greater_than_or_equal_to: 0, less_than: 20}
  validates :description, length: { maximum: 5000 }
  validates :profile, length: { maximum: 5000 }
  validates :ingredients, length: { maximum: 2500 }
  validates :examples, length: { maximum: 1000 }

  accepts_nested_attributes_for :style_yeasts

  def recipe_count
    return self.recipes.count
  end
end
