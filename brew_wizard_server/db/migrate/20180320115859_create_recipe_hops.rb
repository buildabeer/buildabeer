class CreateRecipeHops < ActiveRecord::Migration[5.1]
  def change
    create_table :recipe_hops do |t|
      t.belongs_to :recipe, index: true
      t.belongs_to :hop, index: true
      t.float :quantity, default: 0
      t.float :alpha
      t.integer :time
      t.string :form
      t.string :usage

      t.timestamps
    end
  end
end
