export interface IWaterProfile {
  id: number;
  user_id: number;
  name: string;
  ph: number;
  calcium: number;
  magnesium: number;
  sodium: number;
  sulfate: number;
  chloride: number;
  bicarbonate: number;
  description: string;
  global: boolean;
  recipe_count: number;
}
