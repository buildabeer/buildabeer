class CreateWaterAgents < ActiveRecord::Migration[5.1]
  def change
    create_table :water_agents do |t|
      t.string :name
      t.float :ph
      t.float :bicarbonate
      t.float :sodium
      t.float :chloride
      t.float :magnesium
      t.float :sulfate
      t.float :calcium
      t.string :description
      t.boolean :global, default: false
      t.integer :user_id

      t.index [:user_id, :name], unique: true

      t.timestamps
    end
  end
end
