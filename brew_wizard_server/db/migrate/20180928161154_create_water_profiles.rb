class CreateWaterProfiles < ActiveRecord::Migration[5.1]
  def change
    create_table :water_profiles do |t|
      t.string :profile_type
      t.string :strength
      t.string :bitterness
      t.string :bitterness_2
      t.string :color
      t.integer :calcium_min
      t.integer :calcium_max
      t.integer :alkalinity_min
      t.integer :alkalinity_max
      t.integer :sulfate_min
      t.integer :sulfate_max
      t.integer :chloride_min
      t.integer :chloride_max
      t.integer :magnesium_min
      t.integer :magnesium_max
      t.integer :ra_min
      t.integer :ra_max
      t.string :acidify

      t.timestamps
    end

    add_column :recipes, :water_profile_id, :integer
    add_column :styles, :water_profile_id, :integer
  end
end
