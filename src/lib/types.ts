export interface TypeReference {
    name: string;
    url: string;
  }
  
  export interface TypeRelations {
    double_damage_from: TypeReference[];
    double_damage_to: TypeReference[];
    half_damage_from: TypeReference[];
    half_damage_to: TypeReference[];
    no_damage_from: TypeReference[];
    no_damage_to: TypeReference[];
  }
  
  export interface TypeData {
    name: string;
    damage_relations: TypeRelations;
  }