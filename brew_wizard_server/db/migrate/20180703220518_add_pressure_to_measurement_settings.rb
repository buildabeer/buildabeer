class AddPressureToMeasurementSettings < ActiveRecord::Migration[5.1]
  def change
    add_column :measurement_settings, :pressure, :boolean
  end
end
