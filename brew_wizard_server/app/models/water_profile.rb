class WaterProfile < ApplicationRecord
  has_many :styles
  has_many :recipes

  @profile_types = ["ale", "lager"]
  @strengths = ["light", "medium", "strong"]
  @colors = ["pale", "amber", "brown/black"]
  @bitterness = ["soft", "moderate", "assertive"]
  @acidifier = ["yes", "no", "maybe"]

  validates :profile_type, presence: true, :inclusion => { :in => @profile_types}
  validates :strength, presence: true, :inclusion => { :in => @strengths}
  validates :bitterness, presence: true, :inclusion => { :in => @bitterness}
  validates :bitterness_2, :inclusion => { :in => @bitterness, allow_blank: true }
  validates :color, presence: true, :inclusion => { :in => @colors}
  validates :acidify, presence: true, :inclusion => { :in => @acidifier}

  validates :calcium_min, presence: true, numericality: { greater_than_or_equal_to: 0, less_than_or_equal_to: 150}
  validates :calcium_max, presence: true, numericality: { greater_than_or_equal_to: 0, less_than_or_equal_to: 150}
  validates :alkalinity_min, presence: true, numericality: { greater_than_or_equal_to: 0, less_than_or_equal_to: 200}
  validates :alkalinity_max, presence: true, numericality: { greater_than_or_equal_to: 0, less_than_or_equal_to: 200}
  validates :sulfate_min, presence: true, numericality: { greater_than_or_equal_to: 0, less_than_or_equal_to: 400}
  validates :sulfate_max, presence: true, numericality: { greater_than_or_equal_to: 0, less_than_or_equal_to: 400}
  validates :chloride_min, presence: true, numericality: { greater_than_or_equal_to: 0, less_than_or_equal_to: 150}
  validates :chloride_max, presence: true, numericality: { greater_than_or_equal_to: 0, less_than_or_equal_to: 150}
  validates :magnesium_min, presence: true, numericality: { greater_than_or_equal_to: 0, less_than_or_equal_to: 40}
  validates :magnesium_max, presence: true, numericality: { greater_than_or_equal_to: 0, less_than_or_equal_to: 40}
  validates :ra_min, presence: true, numericality: { greater_than_or_equal_to: -60, less_than_or_equal_to: 200}
  validates :ra_max, presence: true, numericality: { greater_than_or_equal_to: -60, less_than_or_equal_to: 200}
end
