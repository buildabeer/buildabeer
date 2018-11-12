class AddUserIdToWaters < ActiveRecord::Migration[5.1]
  def change
    add_column :waters, :user_id, :int
    add_index :waters, [:user_id, :name], unique: true
  end
end
