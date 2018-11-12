class Hop < ApplicationRecord
  belongs_to :user
  has_many :recipe_hop, dependent: :destroy
  has_many :recipes, :through => :recipe_hop

  has_many :hop_relations, class_name: 'HopRelation', foreign_key: :hop_id
  has_many :inverse_hop_relations, class_name: 'HopRelation', foreign_key: :hop_relation_id
  has_many :hop_substitutes, through: :hop_relations
  has_many :inverse_hop_substitutes, through: :inverse_hop_relations

  validates :name, presence: true, length: { maximum: 40 }
  validates :origin, length: { maximum: 50 }
  validates :hop_type, length: { maximum: 10 }
  validates :alpha, presence: true, numericality: { greater_than_or_equal_to: 0, less_than: 100}
  validates :beta, presence: true, numericality: { greater_than_or_equal_to: 0, less_than: 100}
  validates :description, length: { maximum: 1000 }
  validates :aromas, length: { maximum: 500 }

  accepts_nested_attributes_for :hop_relations

  def recipe_count
    return self.recipes.count
  end
end
