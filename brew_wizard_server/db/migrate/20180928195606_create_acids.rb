class CreateAcids < ActiveRecord::Migration[5.1]
  def change
    create_table :acids do |t|
      t.string :name
      t.integer :strength
      t.float :quantity_for_normal
      t.float :molecular_weight
      t.float :density
      t.string :description

      t.timestamps
    end
  end
end
