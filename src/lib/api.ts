import axios from "./http";
import { getCachedData, setCachedData } from "./cache";
import { TypeData } from "./types";

export async function fetchPokemonData(name: string) {
  const cacheKey = `pokemon_${name.toLowerCase()}`;
  const cached = await getCachedData(cacheKey);
  if (cached) return cached;

  const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`.toLowerCase().trim());
  await setCachedData(cacheKey, response.data);
  return response.data;
}

export async function fetchTypeData(url: string): Promise<TypeData> {
  const response = await axios.get<TypeData>(url);
  return response.data;
}
