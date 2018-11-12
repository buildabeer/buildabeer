# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20181002221509) do

  create_table "acids", force: :cascade do |t|
    t.string "name"
    t.integer "strength"
    t.float "quantity_for_normal"
    t.float "molecular_weight"
    t.float "density"
    t.string "description"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "calendar_events", force: :cascade do |t|
    t.integer "user_id"
    t.string "name"
    t.string "description"
    t.datetime "calendar_start"
    t.datetime "calendar_end"
    t.string "color"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_calendar_events_on_user_id"
  end

  create_table "calendar_reminders", force: :cascade do |t|
    t.integer "calendar_event_id"
    t.datetime "reminder_time"
    t.boolean "sent", default: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["calendar_event_id"], name: "index_calendar_reminders_on_calendar_event_id"
  end

  create_table "contacts", force: :cascade do |t|
    t.string "email"
    t.string "phone"
    t.string "name"
    t.string "title"
    t.string "message"
    t.integer "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "equipment", force: :cascade do |t|
    t.string "name"
    t.integer "user_id"
    t.boolean "global", default: false
    t.float "batch_limit"
    t.float "wl_hlt", default: 0.0
    t.float "wl_mash", default: 0.0
    t.float "wl_boil"
    t.float "boil_rate"
    t.string "description"
    t.float "efficiency", default: 0.0
    t.boolean "fly_sparge", default: false
    t.boolean "batch_sparge", default: true
    t.boolean "whirlpool", default: false
    t.boolean "hop_back", default: true
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "histories", force: :cascade do |t|
    t.float "og"
    t.float "fg"
    t.integer "user_id"
    t.float "gallons"
    t.string "ingredients"
    t.string "notes"
    t.string "recipe_name"
    t.integer "recipe_id"
    t.datetime "brew_date"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "hop_relations", force: :cascade do |t|
    t.integer "hop_id"
    t.integer "hop_relation_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["hop_id", "hop_relation_id"], name: "index_hop_relations_on_hop_id_and_hop_relation_id", unique: true
  end

  create_table "hops", force: :cascade do |t|
    t.string "name"
    t.string "origin"
    t.float "alpha"
    t.string "hop_type"
    t.float "beta"
    t.string "description"
    t.boolean "global", default: false
    t.integer "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "aromas"
  end

  create_table "malt_types", force: :cascade do |t|
    t.string "name"
    t.boolean "efficiency_impact", default: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "malts", force: :cascade do |t|
    t.string "name"
    t.boolean "global", default: false
    t.string "origin"
    t.integer "malt_type_id"
    t.float "color"
    t.float "malt_yield"
    t.float "max_percent"
    t.boolean "must_mash", default: false
    t.float "protein"
    t.float "diastatic_power"
    t.string "description"
    t.integer "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "mash_steps", force: :cascade do |t|
    t.string "name"
    t.string "description"
    t.integer "min_temp"
    t.integer "max_temp"
    t.integer "min_time"
    t.integer "max_time"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "measurement_settings", force: :cascade do |t|
    t.integer "user_id"
    t.string "liquid", default: "us"
    t.string "temperature", default: "us"
    t.string "hops", default: "us"
    t.string "malts", default: "us"
    t.string "agents", default: "metric"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "pressure"
    t.string "color", default: "srm"
    t.string "ibu", default: "tinseth"
    t.index ["user_id"], name: "index_measurement_settings_on_user_id"
  end

  create_table "miscellaneous", force: :cascade do |t|
    t.string "name"
    t.string "miscellaneous_type"
    t.float "amount"
    t.string "amount_label"
    t.float "batch_size"
    t.string "use_for"
    t.float "time"
    t.string "description"
    t.string "usage"
    t.boolean "global"
    t.integer "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "products", force: :cascade do |t|
    t.string "name"
    t.string "description"
    t.float "price"
    t.float "sale_price"
    t.boolean "on_sale", default: false
    t.string "image_url"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "recipe_acids", force: :cascade do |t|
    t.integer "recipe_id"
    t.integer "acid_id"
    t.float "quantity", default: 0.0
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["acid_id"], name: "index_recipe_acids_on_acid_id"
    t.index ["recipe_id"], name: "index_recipe_acids_on_recipe_id"
  end

  create_table "recipe_hops", force: :cascade do |t|
    t.integer "recipe_id"
    t.integer "hop_id"
    t.float "quantity", default: 0.0
    t.float "alpha"
    t.integer "time"
    t.string "form"
    t.string "usage"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["hop_id"], name: "index_recipe_hops_on_hop_id"
    t.index ["recipe_id"], name: "index_recipe_hops_on_recipe_id"
  end

  create_table "recipe_malts", force: :cascade do |t|
    t.integer "recipe_id"
    t.integer "malt_id"
    t.float "quantity", default: 0.0
    t.float "color"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "malt_usage"
    t.index ["malt_id"], name: "index_recipe_malts_on_malt_id"
    t.index ["recipe_id"], name: "index_recipe_malts_on_recipe_id"
  end

  create_table "recipe_mashes", force: :cascade do |t|
    t.integer "recipe_id"
    t.integer "mash_step_id"
    t.integer "temperature", default: 152
    t.integer "time", default: 60
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["mash_step_id"], name: "index_recipe_mashes_on_mash_step_id"
    t.index ["recipe_id"], name: "index_recipe_mashes_on_recipe_id"
  end

  create_table "recipe_miscellaneous", force: :cascade do |t|
    t.integer "recipe_id"
    t.integer "miscellaneou_id"
    t.float "quantity"
    t.string "quantity_label"
    t.string "usage"
    t.float "time"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["miscellaneou_id"], name: "index_recipe_miscellaneous_on_miscellaneou_id"
    t.index ["recipe_id"], name: "index_recipe_miscellaneous_on_recipe_id"
  end

  create_table "recipe_sparge_acids", force: :cascade do |t|
    t.integer "recipe_id"
    t.integer "acid_id"
    t.float "quantity", default: 0.0
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["acid_id"], name: "index_recipe_sparge_acids_on_acid_id"
    t.index ["recipe_id"], name: "index_recipe_sparge_acids_on_recipe_id"
  end

  create_table "recipe_water_agents", force: :cascade do |t|
    t.integer "recipe_id"
    t.integer "water_agent_id"
    t.float "quantity", default: 0.0
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["recipe_id"], name: "index_recipe_water_agents_on_recipe_id"
    t.index ["water_agent_id"], name: "index_recipe_water_agents_on_water_agent_id"
  end

  create_table "recipe_waters", force: :cascade do |t|
    t.integer "recipe_id"
    t.integer "water_id"
    t.float "quantity", default: 0.0
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "boil", default: false
    t.index ["recipe_id"], name: "index_recipe_waters_on_recipe_id"
    t.index ["water_id"], name: "index_recipe_waters_on_water_id"
  end

  create_table "recipe_yeasts", force: :cascade do |t|
    t.integer "recipe_id"
    t.integer "yeast_id"
    t.float "quantity", default: 1.0
    t.integer "fermentation_stage"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["recipe_id"], name: "index_recipe_yeasts_on_recipe_id"
    t.index ["yeast_id"], name: "index_recipe_yeasts_on_yeast_id"
  end

  create_table "recipes", force: :cascade do |t|
    t.integer "user_id"
    t.string "name"
    t.string "brewer"
    t.date "recipe_date"
    t.float "version"
    t.integer "style_id"
    t.float "batch_size"
    t.integer "boil_time"
    t.integer "equipment_id"
    t.integer "target_water_id"
    t.string "notes"
    t.string "description"
    t.string "taste_notes"
    t.boolean "global", default: false
    t.string "sparge_type"
    t.string "mash_type"
    t.string "storage_type"
    t.float "storage_temperature"
    t.float "carbonation_volumes"
    t.string "carbonation_with"
    t.float "primary_ferm_temp"
    t.float "secondary_ferm_temp"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.float "mash_ratio"
    t.boolean "secondary_fermentation"
    t.integer "primary_ferm_days"
    t.integer "secondary_ferm_days"
    t.float "efficiency"
    t.string "recipe_type"
    t.integer "water_profile_id"
  end

  create_table "style_yeasts", force: :cascade do |t|
    t.integer "yeast_id"
    t.integer "style_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["style_id"], name: "index_style_yeasts_on_style_id"
    t.index ["yeast_id"], name: "index_style_yeasts_on_yeast_id"
  end

  create_table "styles", force: :cascade do |t|
    t.string "name", default: ""
    t.boolean "global", default: false
    t.string "subcategory"
    t.integer "category_number"
    t.string "category_name"
    t.string "style_type"
    t.float "min_og"
    t.float "max_og"
    t.float "min_fg"
    t.float "max_fg"
    t.float "min_ibu"
    t.float "max_ibu"
    t.float "min_carb"
    t.float "max_carb"
    t.float "min_color"
    t.float "max_color"
    t.float "min_abv"
    t.float "max_abv"
    t.string "description"
    t.string "profile"
    t.string "ingredients"
    t.string "examples"
    t.integer "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "water_profile_id"
  end

  create_table "styles_yeasts", force: :cascade do |t|
    t.integer "yeast_id"
    t.integer "style_id"
    t.index ["style_id"], name: "index_styles_yeasts_on_style_id"
    t.index ["yeast_id"], name: "index_styles_yeasts_on_yeast_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "provider", default: "email", null: false
    t.string "uid", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer "sign_in_count", default: 0, null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string "current_sign_in_ip"
    t.string "last_sign_in_ip"
    t.string "confirmation_token"
    t.datetime "confirmed_at"
    t.datetime "confirmation_sent_at"
    t.string "unconfirmed_email"
    t.string "name"
    t.string "nickname"
    t.string "image"
    t.string "email"
    t.text "tokens"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "admin", default: false
    t.boolean "contact", default: true
    t.boolean "recipe_reminders", default: true
    t.index ["confirmation_token"], name: "index_users_on_confirmation_token", unique: true
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
    t.index ["uid", "provider"], name: "index_users_on_uid_and_provider", unique: true
  end

  create_table "water_agents", force: :cascade do |t|
    t.string "name"
    t.float "ph"
    t.float "bicarbonate"
    t.float "sodium"
    t.float "chloride"
    t.float "magnesium"
    t.float "sulfate"
    t.float "calcium"
    t.string "description"
    t.boolean "global", default: false
    t.integer "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id", "name"], name: "index_water_agents_on_user_id_and_name", unique: true
  end

  create_table "water_profiles", force: :cascade do |t|
    t.string "profile_type"
    t.string "strength"
    t.string "bitterness"
    t.string "bitterness_2"
    t.string "color"
    t.integer "calcium_min"
    t.integer "calcium_max"
    t.integer "alkalinity_min"
    t.integer "alkalinity_max"
    t.integer "sulfate_min"
    t.integer "sulfate_max"
    t.integer "chloride_min"
    t.integer "chloride_max"
    t.integer "magnesium_min"
    t.integer "magnesium_max"
    t.integer "ra_min"
    t.integer "ra_max"
    t.string "acidify"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "waters", force: :cascade do |t|
    t.float "calcium"
    t.float "sulfate"
    t.float "magnesium"
    t.float "chloride"
    t.float "sodium"
    t.float "bicarbonate"
    t.float "ph"
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "description"
    t.boolean "global", default: false
    t.integer "user_id"
    t.index ["user_id", "name"], name: "index_waters_on_user_id_and_name", unique: true
  end

  create_table "yeast_relations", force: :cascade do |t|
    t.integer "yeast_id"
    t.integer "yeast_relation_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["yeast_id", "yeast_relation_id"], name: "index_yeast_relations_on_yeast_id_and_yeast_relation_id", unique: true
  end

  create_table "yeasts", force: :cascade do |t|
    t.string "name"
    t.integer "user_id"
    t.boolean "global", default: false
    t.string "lab"
    t.string "product_id"
    t.string "yeast_type"
    t.string "form"
    t.float "cell_count"
    t.float "min_attenuation"
    t.float "max_attenuation"
    t.integer "flocculation"
    t.float "min_temperature"
    t.float "max_temperature"
    t.string "description"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

end
