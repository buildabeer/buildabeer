class MashHistory < ApplicationRecord
  belongs_to :new_history
  has_many :mash_step_histories, dependent: :destroy

  validates :hlt_addition_temp, numericality: { greater_than: 0, less_than: 200 }
  validates :hlt_addition, numericality: { greater_than: 0, less_than: 100 }
  validates :ingredient_list, length: { maximum: 5000 }
  validates :ph_addition, length: { maximum: 100 }
  validates :mash_notes, length: { maximum: 1000 }
end
