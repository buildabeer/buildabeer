class AddRecipeTypeToRecipes < ActiveRecord::Migration[5.1]
  def change
    add_column :recipes, :recipe_type, :string
  end
end
