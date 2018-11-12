class CreateHops < ActiveRecord::Migration[5.1]
  def change
    create_table :hops do |t|
      t.string :name
      t.string :origin
      t.float :alpha
      t.string :hop_type
      t.float :beta
      t.string :description
      t.boolean :global, default: false
      t.integer :user_id

      t.timestamps
    end
  end
end
