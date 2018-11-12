class AddColorAndIbuToMeasurementSettings < ActiveRecord::Migration[5.1]
  def change
    add_column :measurement_settings, :color, :string, :default => 'srm'
    add_column :measurement_settings, :ibu, :string, :default => 'tinseth'
  end
end
