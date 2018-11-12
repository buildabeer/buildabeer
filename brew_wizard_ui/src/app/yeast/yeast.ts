import { IStyle } from './../style/style';

export interface IYeast {
  id: number;
  user_id: number;
  name: string;
  global: boolean;
  lab: string;
  product_id: string;
  yeast_type: string;
  form: string;
  flocculation: number;
  min_attenuation: number;
  max_attenuation: number;
  min_temperature: number;
  max_temperature: number;
  cell_count: number;
  description: string;
  recipe_count: number;
  style_yeasts: { id: number, style_id: number, yeast_id: number }[];
  yeast_relations: { id: number, yeast_id: number, yeast_relation_id: number }[];
}
