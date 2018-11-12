class CalendarEvent < ApplicationRecord
  belongs_to :user

  validates :name, presence: true, length: { maximum: 100 }
  validates :description, length: { maximum: 500 }
  validates :calendar_start, presence: true

  has_many :calendar_reminders, dependent: :destroy

  accepts_nested_attributes_for :calendar_reminders
end
