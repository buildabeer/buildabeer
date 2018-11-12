class CreateWaters < ActiveRecord::Migration[5.1]
  def change
    create_table :waters do |t|
      t.float :calcium
      t.float :sulfate
      t.float :magnesium
      t.float :chloride
      t.float :sodium
      t.float :bicarbonate
      t.float :ph
      t.string :name

      t.timestamps
    end
  end
end
