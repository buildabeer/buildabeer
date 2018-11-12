class AddContactToUser < ActiveRecord::Migration[5.1]
  def change
    add_column :users, :contact, :boolean, default: true
    add_column :users, :recipe_reminders, :boolean, default: true
  end
end
