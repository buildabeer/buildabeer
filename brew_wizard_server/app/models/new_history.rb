class NewHistory < ApplicationRecord
  belongs_to :user
  belongs_to :recipe

  has_one :boil_history, dependent: :destroy
  accepts_nested_attributes_for :boil_histories

  has_one :chill_history, dependent: :destroy
  accepts_nested_attributes_for :chill_histories

  has_one :fermentation_history, dependent: :destroy
  accepts_nested_attributes_for :fermentation_histories

  has_one :hlt_history, dependent: :destroy
  accepts_nested_attributes_for :hlt_histories

  has_one :mash_history, dependent: :destroy
  accepts_nested_attributes_for :mash_histories
  
  has_many :mash_step_histories, :through => :recipe_waters
  accepts_nested_attributes_for :mash_step_histories

  has_one :sparge_history, dependent: :destroy
  accepts_nested_attributes_for :sparge_histories

  validates :recipe_name, length: { maximum: 40 }
  validates :brew_date, presence: true
  validates :ingredient_list, length: { maximum: 5000 }
end
