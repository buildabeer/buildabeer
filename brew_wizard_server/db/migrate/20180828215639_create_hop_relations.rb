class CreateHopRelations < ActiveRecord::Migration[5.1]
  def change
    create_table :hop_relations do |t|
      t.integer :hop_id
      t.integer :hop_relation_id

      t.timestamps
    end

    add_index :hop_relations, [:hop_id, :hop_relation_id], unique: true
  end
end
