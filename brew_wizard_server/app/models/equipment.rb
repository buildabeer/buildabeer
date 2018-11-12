class Equipment < ApplicationRecord
  belongs_to :user

  validates :name, presence: true, length: { maximum: 40 }
  validates :wl_hlt, numericality: { greater_than_or_equal_to: 0, less_than: 100}
  validates :efficiency, numericality: { greater_than_or_equal_to: 0, less_than_or_equal_to: 100}
  validates :wl_mash, numericality: { greater_than_or_equal_to: 0, less_than: 100}
  validates :wl_boil, presence: true, numericality: { greater_than_or_equal_to: 0, less_than: 100}
  validates :boil_rate, presence: true, numericality: { greater_than_or_equal_to: 0, less_than: 100}
  validates :description, length: { maximum: 500 }
  validates :batch_limit, presence: true, numericality: { greater_than: 0 }

  def recipe_count
    return Recipe.where(equipment_id: self.id).count
  end
end
