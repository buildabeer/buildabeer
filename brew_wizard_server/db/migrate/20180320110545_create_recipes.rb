class CreateRecipes < ActiveRecord::Migration[5.1]
  def change
    create_table :recipes do |t|
      t.integer :user_id
      t.string :name
      t.string :brewer
      t.date :recipe_date
      t.float :version
      t.integer :style_id
      t.float :batch_size
      t.integer :boil_time
      t.integer :equipment_id
      t.integer :target_water_id
      t.string :notes
      t.string :description
      t.string :taste_notes
      t.boolean :global, default: false
      t.string :sparge_type
      t.string :mash_type
      t.string :storage_type
      t.float :storage_temperature
      t.float :carbonation_volumes
      t.string :carbonation_with
      t.float :primary_ferm_temp
      t.float :secondary_ferm_temp

      t.timestamps
    end
  end
end
