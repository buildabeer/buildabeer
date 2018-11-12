class FixCalendarEventColumnNamesStartEnd < ActiveRecord::Migration[5.1]
  def change
    rename_column :calendar_events, :start, :calendar_start
    rename_column :calendar_events, :end, :calendar_end
  end
end
