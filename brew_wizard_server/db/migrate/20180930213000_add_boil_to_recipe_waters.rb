class AddBoilToRecipeWaters < ActiveRecord::Migration[5.1]
  def change
    add_column :recipe_waters, :boil, :boolean, default: false
  end
end
