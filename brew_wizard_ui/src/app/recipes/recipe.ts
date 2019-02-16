export interface IRecipe {
  name: string;
  id: number;
  brewer: string;
  recipe_date: any;
  version: number;
  batch_size: number;
  boil_time: number;
  equipment_id: number;
  water_profile_id: number;
  notes: string;
  description: string;
  taste_notes: string;
  style_id: number;
  target_water_id: number;
  global: boolean;
  sparge_type: string;
  mash_type: string;
  storage_type: string;
  storage_temperature: number;
  carbonation_volumes: number;
  carbonation_with: string;
  primary_ferm_temp: number;
  secondary_ferm_temp: number;
  mash_ratio: number;
  secondary_fermentation: boolean;
  primary_ferm_days: number;
  secondary_ferm_days: number;
  efficiency: number;
  recipe_type: string;
  user_nickname: string;

  recipe_waters_attributes: {water_id: number, quantity: number, id: number, boil: boolean }[];
  recipe_water_agents_attributes: {id: number, water_agent_id: number, quantity: number}[];
  recipe_malts_attributes: {id: number, malt_id: number, quantity: number, color: number, malt_usage: string }[];
  recipe_hops_attributes: {id: number, hop_id: number, quantity: number, alpha: number, time: number, form: string, usage: string}[];
  recipe_miscellaneous_attributes: {id: number, miscellaneou_id: number, quantity: number,
    quantity_label: string, time: number, time_label: string, usage: string}[];
  recipe_yeasts_attributes: {id: number, yeast_id: number, quantity: number, fermentation_stage: number}[];
  recipe_acids_attributes: {id: number, acid_id: number, quantity: number}[];
  recipe_sparge_acids_attributes: {id: number, acid_id: number, quantity: number}[];
  recipe_mashes_attributes: {id: number, mash_step_id: number, time: number, temperature: number, name: string, used: boolean}[];
  yeast_starters_attributes: {id: number, aeration_method: string, gravity: number, volume: number}[];
}
