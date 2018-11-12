class CreateHistories < ActiveRecord::Migration[5.1]
  def change
    create_table :histories do |t|
      t.float :og
      t.float :fg
      t.integer :user_id
      t.float :gallons
      t.string :ingredients
      t.string :notes
      t.string :recipe_name
      t.integer :recipe_id
      t.datetime :brew_date

      t.timestamps
    end
  end
end
