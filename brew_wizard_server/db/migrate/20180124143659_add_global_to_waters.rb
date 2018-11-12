class AddGlobalToWaters < ActiveRecord::Migration[5.1]
  def change
    add_column :waters, :global, :boolean, default: false
  end
end
