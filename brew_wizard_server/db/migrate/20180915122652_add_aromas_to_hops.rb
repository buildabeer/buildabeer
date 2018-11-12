class AddAromasToHops < ActiveRecord::Migration[5.1]
  def change
    add_column :hops, :aromas, :string
  end
end
