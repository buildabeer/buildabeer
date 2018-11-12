class CreateRecipeWaterAgents < ActiveRecord::Migration[5.1]
  def change
    create_table :recipe_water_agents do |t|
      t.belongs_to :recipe, index: true
      t.belongs_to :water_agent, index: true
      t.float :quantity, default: 0

      t.timestamps
    end
  end
end
