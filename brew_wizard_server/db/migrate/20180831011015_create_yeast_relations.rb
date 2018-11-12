class CreateYeastRelations < ActiveRecord::Migration[5.1]
  def change
    create_table :yeast_relations do |t|
      t.integer :yeast_id
      t.integer :yeast_relation_id

      t.timestamps
    end

    add_index :yeast_relations, [:yeast_id, :yeast_relation_id], unique: true
  end
end
