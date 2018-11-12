class CreateYeasts < ActiveRecord::Migration[5.1]
  def change
    create_table :yeasts do |t|
      t.string :name
      t.integer :user_id
      t.boolean :global, default: false
      t.string :lab
      t.string :product_id
      t.string :yeast_type
      t.string :form
      t.float :cell_count
      t.float :min_attenuation
      t.float :max_attenuation
      t.integer :flocculation
      t.float :min_temperature
      t.float :max_temperature
      t.string :description

      t.timestamps
    end
  end
end
