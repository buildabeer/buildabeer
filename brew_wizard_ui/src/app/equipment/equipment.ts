export interface IEquipment {
  id: number;
  user_id: number;
  name: string;
  global: boolean;
  fly_sparge: boolean;
  batch_sparge: boolean;
  wl_hlt: number;
  wl_mash: number;
  wl_boil: number;
  boil_rate: number;
  efficiency: number;
  batch_limit: number;
  whirlpool: boolean;
  hop_back: boolean;
  recipe_count: number;
}
