class CreateMashSteps < ActiveRecord::Migration[5.1]
  def change
    create_table :mash_steps do |t|
      t.string :name
      t.string :description
      t.integer :min_temp
      t.integer :max_temp
      t.integer :min_time
      t.integer :max_time

      t.timestamps
    end
  end
end
