class CreateRecipeMalts < ActiveRecord::Migration[5.1]
  def change
    create_table :recipe_malts do |t|
      t.belongs_to :recipe, index: true
      t.belongs_to :malt, index: true
      t.float :quantity, default: 0
      t.float :color

      t.timestamps
    end
  end
end
