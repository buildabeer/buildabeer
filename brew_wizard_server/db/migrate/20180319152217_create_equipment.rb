class CreateEquipment < ActiveRecord::Migration[5.1]
  def change
    create_table :equipment do |t|
      t.string :name
      t.integer :user_id
      t.boolean :global, default: false
      t.string :equipment_type
      t.float :batch_limit
      t.float :wl_hlt, default: 0
      t.float :wl_mash, default: 0
      t.float :wl_boil
      t.float :boil_rate
      t.string :description
      t.float :efficiency, default: 0
      t.boolean :fly_sparge, default: false
      t.boolean :batch_sparge, default: true
      t.boolean :whirlpool, default: false
      t.boolean :hop_back, default: true

      t.timestamps
    end
  end
end
