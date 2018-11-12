class CreateMalts < ActiveRecord::Migration[5.1]
  def change
    create_table :malts do |t|
      t.string :name
      t.boolean :global, default: false
      t.string :origin
      t.integer :malt_type_id
      t.float :color
      t.float :malt_yield
      t.float :max_percent
      t.boolean :must_mash, default: false
      t.float :protein
      t.float :diastatic_power
      t.string :description
      t.integer :user_id

      t.timestamps
    end
  end
end
