class AddDescriptionToWaters < ActiveRecord::Migration[5.1]
  def change
    add_column :waters, :description, :string
  end
end
