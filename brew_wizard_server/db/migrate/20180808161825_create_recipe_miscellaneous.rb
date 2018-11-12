class CreateRecipeMiscellaneous < ActiveRecord::Migration[5.1]
  def change
    create_table :recipe_miscellaneous do |t|
      t.belongs_to :recipe, index: true
      t.belongs_to :miscellaneou, index: true
      t.float :quantity
      t.string :quantity_label
      t.string :usage
      t.float :time

      t.timestamps
    end
  end
end
