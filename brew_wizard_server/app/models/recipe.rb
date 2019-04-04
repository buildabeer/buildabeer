class Recipe < ApplicationRecord
  @storage_types = ["keg", "bottle"]
  @carbonation_withs = ["pressure", "cornsugar", "dme", "honey", "tablesugar", "gyle"]
  @recipe_types = ["All Grain", "Extract", "Brew in a Bag"]

  belongs_to :user

  has_many :recipe_waters, dependent: :destroy
  has_many :waters, :through => :recipe_waters

  has_many :recipe_water_agents, dependent: :destroy
  has_many :water_agents, :through => :recipe_water_agents

  has_many :recipe_acids, dependent: :destroy
  has_many :acids, :through => :recipe_acids

  has_many :recipe_sparge_acids, dependent: :destroy
  has_many :sparge_acids, :through => :recipe_sparge_acids, :source => :acid

  has_many :recipe_malts, dependent: :destroy
  has_many :malts, :through => :recipe_malts

  has_many :recipe_hops, dependent: :destroy
  has_many :hops, :through => :recipe_hops

  has_many :recipe_yeasts, dependent: :destroy
  has_many :yeasts, :through => :recipe_yeasts

  has_many :recipe_mashes, dependent: :destroy
  has_many :mash_steps, :through => :recipe_mashes

  has_many :recipe_yeasts, dependent: :destroy
  has_many :yeasts, :through => :recipe_yeasts

  has_many :recipe_miscellaneous, dependent: :destroy
  has_many :miscellaneous, :through => :recipe_miscellaneous

  has_many :new_histories

  has_many :yeast_starters, dependent: :destroy

  belongs_to :style
  belongs_to :equipment
  belongs_to :water_profile
  belongs_to :target_water, :class_name => "Water"

  validates :name, length: { maximum: 40 }
  validates :brewer, length: { maximum: 40 }
  validates :notes, length: { maximum: 1000 }
  validates :description, length: { maximum: 1000 }
  validates :taste_notes, length: { maximum: 1000 }
  validates :storage_type, :inclusion => { :in => @storage_types }
  validates :recipe_type, :inclusion => { :in => @recipe_types }
  validates :storage_temperature, numericality: { greater_than: 32, less_than: 125}
  validates :carbonation_volumes, numericality: { greater_than_or_equal_to: 0, less_than: 100 }
  validates :carbonation_with, :inclusion => { :in => @carbonation_withs }
  validates :primary_ferm_temp, numericality: { greater_than: 32, less_than: 125}
  validates :secondary_ferm_temp, numericality: { greater_than: 32, less_than: 125}
  validates :efficiency, numericality: { greater_than: 0, less_than_or_equal_to: 100}
  validates :mash_ratio, numericality: { greater_than: 0, less_than: 5}
  validates :batch_size, numericality: { greater_than: 0, less_than: 5000}
  validates :primary_ferm_days, numericality: { greater_than: 0 }
  validates :secondary_ferm_days, numericality: { greater_than: 0 }

  accepts_nested_attributes_for :recipe_waters
  accepts_nested_attributes_for :recipe_acids
  accepts_nested_attributes_for :recipe_sparge_acids
  accepts_nested_attributes_for :recipe_water_agents
  accepts_nested_attributes_for :recipe_malts
  accepts_nested_attributes_for :recipe_hops
  accepts_nested_attributes_for :recipe_yeasts
  accepts_nested_attributes_for :recipe_mashes
  accepts_nested_attributes_for :recipe_miscellaneous
  accepts_nested_attributes_for :yeast_starters

  def user_nickname
    return self.user.nickname
  end
end
