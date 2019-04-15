export interface INewHistory {
  id: number;
  recipe_id: number;
  recipe_name: string;
  brew_date: any;
  ingredient_list: string;

  hlt_histories_attributes: { id: number, hlt_temp: number, hlt_quantity: number, agent_list: string, hlt_notes: string };
  mash_histories_attributes: { id: number, hlt_addition: number, hlt_addition_temp: number, ingredient_list: string
                              ph_addition: number, mash_notes: string };
  mash_step_histories_attributes: { id: number, mash_history_id: number, step_counter: number, step_temperature: number,
                                   step_minutes: number, step_water_temperature: number, step_water_quantity: number }[];
  sparge_histories_attributes: { id: number, sparge_temperature: number, sparge_quantity: number, ingredient_list: string,
                                sparge_notes: string };
  boil_histories_attributes: { id: number, pre_boil_gravity: number, pre_boil_quantity: number, boil_minutes: number,
                              ingredient_list: string, gravity_additions: number, boil_notes: string };
  chill_histories_attributes: { id: number, chill_method: string, chill_minutes: number, ingredient_list: string, chill_notes: string };
  fermentation_histories_attributes: { id: number, wort_quantity: number, fermentation_days: number, original_gravity: number,
                                      fermentation_temperature: number, aeration_method: string, aeration_minutes: number,
                                      secondary_ferm_days: number, ingredient_list: string, fermentation_notes: string };
  reminder_histories_attributes: { id: number, possible_reminders: string, added_reminders: string, reminder_notes: string };
}
