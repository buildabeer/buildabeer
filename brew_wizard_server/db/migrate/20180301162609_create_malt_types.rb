class CreateMaltTypes < ActiveRecord::Migration[5.1]
  def change
    create_table :malt_types do |t|
      t.string :name
      t.boolean :efficiency_impact, default: false

      t.timestamps
    end
  end
end
