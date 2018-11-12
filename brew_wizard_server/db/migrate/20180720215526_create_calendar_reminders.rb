class CreateCalendarReminders < ActiveRecord::Migration[5.1]
  def change
    create_table :calendar_reminders do |t|
      t.belongs_to :calendar_event, index: true, foreign_key: true
      t.datetime :reminder_time
      t.boolean :sent, default: false

      t.timestamps
    end
  end
end
