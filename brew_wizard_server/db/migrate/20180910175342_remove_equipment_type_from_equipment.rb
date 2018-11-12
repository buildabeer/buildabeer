class RemoveEquipmentTypeFromEquipment < ActiveRecord::Migration[5.1]
  def change
    remove_column :equipment, :equipment_type
  end
end
