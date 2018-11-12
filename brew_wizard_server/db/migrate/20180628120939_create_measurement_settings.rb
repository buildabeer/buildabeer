class CreateMeasurementSettings < ActiveRecord::Migration[5.1]
  def change
    create_table :measurement_settings do |t|
      t.belongs_to :user, index: true, foreign_key: true
      t.string :liquid, :default => 'us'
      t.string :temperature, :default => 'us'
      t.string :hops, :default => 'us'
      t.string :malts, :default => 'us'
      t.string :agents, :default => 'metric'

      t.timestamps
    end
  end
end
