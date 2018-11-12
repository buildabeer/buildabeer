export interface IStyle {
  id: number;
  user_id: number;
  name: string;
  subcategory: string;
  category_number: number;
  category_name: string;
  style_type: string;
  min_og: number;
  max_og: number;
  min_fg: number;
  max_fg: number;
  min_ibu: number;
  max_ibu: number;
  min_carb: number;
  max_carb: number;
  min_color: number;
  max_color: number;
  min_abv: number;
  max_abv: number;
  description: string;
  profile: string;
  ingredients: string;
  examples: string;
  global: boolean;
  recipe_count: number;
  water_profile_id: number;
}
