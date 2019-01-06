class Contact < ApplicationRecord
  validates :email, length: { maximum: 100 }
  validates :title, length: { maximum: 100 }
  validates :message, presence: true, length: { maximum: 1000 }
  validates :phone, length: { maximum: 16 }
  validates :name, length: { maximum: 100 }
end
