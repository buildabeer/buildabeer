class CreateYeastStarters < ActiveRecord::Migration[5.1]
  def change
    create_table :yeast_starters do |t|
      t.belongs_to :recipe, index: true
      t.string :aeration_method
      t.float :gravity
      t.float :volume

      t.timestamps
    end
  end
end
