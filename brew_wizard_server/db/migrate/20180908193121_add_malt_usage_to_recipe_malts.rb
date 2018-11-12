class AddMaltUsageToRecipeMalts < ActiveRecord::Migration[5.1]
  def change
    add_column :recipe_malts, :malt_usage, :string
  end
end
