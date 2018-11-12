export interface IHop {
  id: number;
  user_id: number;
  name: string;
  global: boolean;
  origin: string;
  hop_type: string;
  alpha: number;
  beta: number;
  description: string;
  recipe_count: number;
  hop_relations: { id: number, hop_id: number, hop_relation_id: number }[];
  aromas: string;
}
