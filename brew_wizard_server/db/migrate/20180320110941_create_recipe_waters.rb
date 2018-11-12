class CreateRecipeWaters < ActiveRecord::Migration[5.1]
  def change
    create_table :recipe_waters do |t|
      t.belongs_to :recipe, index: true
      t.belongs_to :water, index: true
      t.float :quantity, default: 0

      t.timestamps
    end
  end
end
