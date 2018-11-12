class CreateProducts < ActiveRecord::Migration[5.1]
  def change
    create_table :products do |t|
      t.string :name
      t.string :description
      t.float :price
      t.float :sale_price
      t.boolean :on_sale, :default => false
      t.string :image_url

      t.timestamps
    end
  end
end
