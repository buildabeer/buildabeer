class CreateContacts < ActiveRecord::Migration[5.1]
  def change
    create_table :contacts do |t|
      t.string :email
      t.string :phone
      t.string :name
      t.string :title
      t.string :message
      t.integer :user_id

      t.timestamps
    end
  end
end
