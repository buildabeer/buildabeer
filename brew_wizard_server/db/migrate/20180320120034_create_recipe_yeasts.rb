class CreateRecipeYeasts < ActiveRecord::Migration[5.1]
  def change
    create_table :recipe_yeasts do |t|
      t.belongs_to :recipe, index: true
      t.belongs_to :yeast, index: true
      t.float :quantity, default: 1
      t.integer :fermentation_stage

      t.timestamps
    end
  end
end
