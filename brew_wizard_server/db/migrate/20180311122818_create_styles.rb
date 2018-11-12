class CreateStyles < ActiveRecord::Migration[5.1]
  def change
    create_table :styles do |t|
      t.string :name, :default => ""
      t.boolean :global, default: false
      t.string :subcategory
      t.integer :category_number
      t.string :category_name
      t.string :style_type
      t.float :min_og
      t.float :max_og
      t.float :min_fg
      t.float :max_fg
      t.float :min_ibu
      t.float :max_ibu
      t.float :min_carb
      t.float :max_carb
      t.float :min_color
      t.float :max_color
      t.float :min_abv
      t.float :max_abv
      t.string :description
      t.string :profile
      t.string :ingredients
      t.string :examples
      t.integer :user_id

      t.timestamps
    end
  end
end
