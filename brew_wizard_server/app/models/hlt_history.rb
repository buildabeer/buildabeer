class HltHistory < ApplicationRecord
  belongs_to :new_history

  validates :hlt_temp, numericality: { greater_than: 0, less_than: 200 }
  validates :hlt_quantity, numericality: { greater_than: 0, less_than: 100 }
  validates :agent_list, length: { maximum: 5000 }
  validates :hlt_notes, length: { maximum: 1000 }
end
