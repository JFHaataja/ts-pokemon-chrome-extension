import axios from "axios";
import axiosInstance from "./http";
import { TypeData } from "./types";

export async function fetchPokemonData(name: string) {
  const response = await axiosInstance.get(
    `https://pokeapi.co/api/v2/pokemon/${name.toLowerCase().trim()}`
  );
  return response.data;
}

export async function fetchTypeData(url: string): Promise<TypeData> {
  const response = await axios.get<TypeData>(url);
  return response.data;
}
