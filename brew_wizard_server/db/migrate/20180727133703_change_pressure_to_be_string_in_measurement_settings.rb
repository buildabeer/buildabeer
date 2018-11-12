class ChangePressureToBeStringInMeasurementSettings < ActiveRecord::Migration[5.1]
  def change
    change_column :measurement_settings, :pressure, :string
  end
end
