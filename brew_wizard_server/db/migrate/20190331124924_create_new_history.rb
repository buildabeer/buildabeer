class CreateNewHistory < ActiveRecord::Migration[5.1]
  def change
    create_table :new_histories do |t|
      t.int :user_id, index: true
      t.int :recipe_id, index: true
      t.string :recipe_name
      t.date :brew_date
      t.string :ingredient_list
    end

    create_table :hlt_histories do |t|
      t.int :hlt_temp
      t.double :hlt_quantity
      t.string :agent_list
      t.string :hlt_notes
      t.int :new_history_id, index: true
    end

    create_table :mash_histories do |t|
      t.double :hlt_addition
      t.int :hlt_addition_temp
      t.string :ingredient_list
      t.string :ph_addition
      t.string :mash_notes
      t.int :new_history_id, index: true
    end

    create_table :mash_step_histories do |t|
      t.int :mash_history_id
      t.int :step_counter
      t.int :step_temperature
      t.double :step_minutes
      t.int :step_water_temperature
      t.double :step_water_quantity
    end

    create_table :sparge_histories do |t|
      t.int :sparge_temperature
      t.double :sparge_quantity
      t.string :ingredient_list
      t.string :sparge_notes
      t.int :new_history_id, index: true
    end

    create_table :boil_histories do |t|
      t.double :pre_boil_gravity
      t.double :pre_boil_quantity
      t.double :boil_minutes
      t.string :ingredient_list
      t.string :gravity_additions
      t.string :boil_notes
      t.int :new_history_id, index: true
    end

    create_table :chill_histories do |t|
      t.string :chill_method
      t.int :chill_minutes
      t.string :ingredient_list
      t.string :chill_notes
      t.int :new_history_id, index: true
    end

    create_table :fermentation_histories do |t|
      t.double :wort_quantity
      t.int :fermentation_days
      t.double :original_gravity
      t.int :fermentation_temperature
      t.string :aeration_method
      t.int :aeration_minutes
      t.string :secondary_ferm_days
      t.string :ingredient_list
      t.string :fermentation_notes
      t.int :new_history_id, index: true
    end

    create_table :reminder_histories do |t|
      t.string :possible_reminders
      t.string :added_reminders
      t.string :reminder_notes
      t.int :new_history_id, index: true
    end
  end
end
