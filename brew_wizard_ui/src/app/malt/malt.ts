export interface IMalt {
  id: number;
  user_id: number;
  name: string;
  global: boolean;
  malt_type_id: number;
  origin: string;
  color: number;
  malt_yield: number;
  diastatic_power: number;
  protein: number;
  must_mash: boolean;
  max_percent: number;
  description: string;
  recipe_count: number;
}
