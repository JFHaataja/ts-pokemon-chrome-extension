import { fetchTypeData } from "./api";

export async function getPokemonWeaknesses(types: string[]) {
  const multiplierMap: Record<string, number> = {};

  for (const type of types) {
    const data = await fetchTypeData(`https://pokeapi.co/api/v2/type/${type}`);

    data.damage_relations.double_damage_from.forEach((t) => {
      multiplierMap[t.name] = (multiplierMap[t.name] ?? 1) * 2;
    });
    data.damage_relations.half_damage_from.forEach((t) => {
      multiplierMap[t.name] = (multiplierMap[t.name] ?? 1) * 0.5;
    });
    data.damage_relations.no_damage_from.forEach((t) => {
      multiplierMap[t.name] = (multiplierMap[t.name] ?? 1) * 0;
    });
  }

  const doubleWeaknesses = Object.entries(multiplierMap)
    .filter(([_, multiplier]) => multiplier === 2)
    .map(([typeName]) => typeName);

  const quadrupleWeaknesses = Object.entries(multiplierMap)
    .filter(([_, multiplier]) => multiplier === 4)
    .map(([typeName]) => typeName);

  return {
    doubleWeaknesses,
    quadrupleWeaknesses,
  };
}
