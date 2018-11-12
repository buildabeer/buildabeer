class CreateMiscellaneous < ActiveRecord::Migration[5.1]
  def change
    create_table :miscellaneous do |t|
      t.string :name
      t.string :miscellaneous_type
      t.float :amount
      t.string :amount_label
      t.float :batch_size
      t.string :use_for
      t.float :time
      t.string :description
      t.string :usage
      t.boolean :global
      t.integer :user_id

      t.timestamps
    end
  end
end
