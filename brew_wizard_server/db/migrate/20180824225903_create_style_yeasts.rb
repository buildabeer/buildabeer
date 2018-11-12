class CreateStyleYeasts < ActiveRecord::Migration[5.1]
  def change
    create_table :style_yeasts do |t|
      t.belongs_to :yeast, index: true
      t.belongs_to :style, index: true

      t.timestamps
    end
  end
end
