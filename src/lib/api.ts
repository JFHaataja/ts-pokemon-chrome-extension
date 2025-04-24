import axios from "axios";
import { setupCache } from "axios-cache-interceptor";
import { TypeData } from "./types";

const instance = axios.create();
const axiosInstance = setupCache(instance);

export async function fetchPokemonData(name: string) {
  const response = await axiosInstance.get(
    `https://pokeapi.co/api/v2/pokemon/${name.toLowerCase().trim()}`,
  );
  return response.data;
}

export async function fetchTypeData(url: string): Promise<TypeData> {
  const response = await axios.get<TypeData>(url);
  return response.data;
}
