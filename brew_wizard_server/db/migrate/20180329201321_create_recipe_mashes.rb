class CreateRecipeMashes < ActiveRecord::Migration[5.1]
  def change
    create_table :recipe_mashes do |t|
      t.belongs_to :recipe, index: true
      t.belongs_to :mash_step, index: true
      t.integer :temperature, default: 152
      t.integer :time, default: 60

      t.timestamps
    end
  end
end
