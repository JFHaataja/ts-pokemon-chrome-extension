import axios from "axios";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { fetchPokemonData, fetchTypeData } from "../lib/api";
import { TypeData } from "../lib/types";

vi.mock("axios");
const mockedGet = axios.get as unknown as ReturnType<typeof vi.fn>;

describe("fetchPokemonData", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns data for a valid Pokémon", async () => {
    mockedGet.mockResolvedValueOnce({
      data: {
        id: 1,
        name: "bulbasaur",
        types: [{ type: { name: "grass" } }, { type: { name: "poison" } }],
      },
    });

    const result = await fetchPokemonData("bulbasaur");

    expect(result.name).toBe("bulbasaur");
    expect(mockedGet).toHaveBeenCalledWith(
      "https://pokeapi.co/api/v2/pokemon/bulbasaur",
    );
  });
});

describe("fetchTypeData", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns type data correctly", async () => {
    const mockTypeData: TypeData = {
      name: "",
      damage_relations: {
        double_damage_from: [
          { name: "fire", url: "https://pokeapi.co/api/v2/type/fire" },
          { name: "flying", url: "https://pokeapi.co/api/v2/type/flying" },
        ],
        double_damage_to: [],
        half_damage_from: [],
        half_damage_to: [],
        no_damage_from: [],
        no_damage_to: [],
      },
    };

    mockedGet.mockResolvedValueOnce({
      data: mockTypeData,
    });

    const result = await fetchTypeData("https://pokeapi.co/api/v2/type/grass");

    expect(result.damage_relations.double_damage_from[0].name).toBe("fire");
    expect(result.damage_relations.double_damage_from.length).toBe(2);
    expect(mockedGet).toHaveBeenCalledWith(
      "https://pokeapi.co/api/v2/type/grass",
    );
  });
});
