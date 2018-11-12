class AddMashRatioToRecipes < ActiveRecord::Migration[5.1]
  def change
    add_column :recipes, :mash_ratio, :float
  end
end
