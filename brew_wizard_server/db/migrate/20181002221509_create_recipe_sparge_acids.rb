class CreateRecipeSpargeAcids < ActiveRecord::Migration[5.1]
  def change
    create_table :recipe_sparge_acids do |t|
      t.belongs_to :recipe, index: true
      t.belongs_to :acid, index: true
      t.float :quantity, default: 0

      t.timestamps
    end
  end
end
