class AddEfficiencyToRecipes < ActiveRecord::Migration[5.1]
  def change
    add_column :recipes, :efficiency, :float
  end
end
