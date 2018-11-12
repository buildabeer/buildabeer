class AddSecondaryFermentationPrimaryDaysSecondaryDaysToRecipes < ActiveRecord::Migration[5.1]
  def change
    add_column :recipes, :secondary_fermentation, :boolean
    add_column :recipes, :primary_ferm_days, :integer
    add_column :recipes, :secondary_ferm_days, :integer
  end
end
