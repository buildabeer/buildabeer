class Yeast < ApplicationRecord
  belongs_to :user
  has_many :recipe_yeast, dependent: :destroy
  has_many :recipes, :through => :recipe_yeast

  has_many :style_yeasts, dependent: :destroy
  has_many :styles, :through => :style_yeasts

  has_many :yeast_relations, class_name: 'YeastRelation', foreign_key: :yeast_id
  has_many :inverse_yeast_relations, class_name: 'YeastRelation', foreign_key: :yeast_relation_id
  has_many :yeast_substitutes, through: :yeast_relations
  has_many :inverse_yeast_substitutes, through: :inverse_yeast_relations

  validates :name, presence: true, length: { maximum: 40 }
  validates :lab, length: { maximum: 40 }
  validates :product_id, length: { maximum: 10 }
  validates :yeast_type, presence: true, length: { maximum: 10 }
  validates :form, length: { maximum: 10 }
  validates :cell_count, presence: true, numericality: { greater_than: 0}
  validates :min_attenuation, presence: true, numericality: { greater_than_or_equal_to: 0, less_than_or_equal_to: 100}
  validates :max_attenuation, presence: true, numericality: { greater_than_or_equal_to: 0, less_than_or_equal_to: 100}
  validates :flocculation, presence: true, numericality: { greater_than_or_equal_to: 0, less_than_or_equal_to: 5}
  validates :min_temperature, presence: true, numericality: { greater_than_or_equal_to: 0, less_than_or_equal_to: 212}
  validates :max_temperature, presence: true, numericality: { greater_than_or_equal_to: 0, less_than_or_equal_to: 212}
  validates :description, length: { maximum: 2000 }

  accepts_nested_attributes_for :style_yeasts
  accepts_nested_attributes_for :yeast_relations

  def recipe_count
    return self.recipes.count
  end
end
