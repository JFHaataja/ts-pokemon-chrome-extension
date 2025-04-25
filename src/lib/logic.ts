import { fetchTypeData } from "./api";

export async function getPokemonWeaknesses(types: string[]) {
  const weaknesses: Set<string> = new Set();

  for (const type of types) {
    const data = await fetchTypeData(`https://pokeapi.co/api/v2/type/${type}`);
    data.damage_relations.double_damage_from.forEach((typeObj) => {
      weaknesses.add(typeObj.name);
    });
  }

  return Array.from(weaknesses);
}
