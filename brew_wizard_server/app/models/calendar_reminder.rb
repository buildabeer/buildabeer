class CalendarReminder < ApplicationRecord
  belongs_to :calendar_event

  validates :reminder_time, presence: true
end
