class CreateCalendarEvents < ActiveRecord::Migration[5.1]
  def change
    create_table :calendar_events do |t|
      t.belongs_to :user, index: true, foreign_key: true
      t.string :name
      t.string :description
      t.datetime :start
      t.datetime :end
      t.string :color

      t.timestamps
    end
  end
end
