import { describe, it, expect, vi, beforeEach } from "vitest";
import axios from "axios";
import { fetchPokemonData, fetchTypeData } from "../lib/api";

vi.mock("../lib/http", () => ({
  default: {
    get: vi.fn(),
  },
}));

vi.mock("axios");

describe("fetchPokemonData", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should fetch Pokémon data", async () => {
    const mockedGet = vi.mocked((await import("../lib/http")).default.get);
    mockedGet.mockResolvedValueOnce({
      data: { name: "pikachu", id: 25 },
    });

    const data = await fetchPokemonData("Pikachu");
    expect(data).toEqual({ name: "pikachu", id: 25 });
  });
});

describe("fetchTypeData", () => {
  it("should fetch type data", async () => {
    vi.mocked(axios.get).mockResolvedValueOnce({
      data: {
        damage_relations: {
          double_damage_from: [{ name: "ground", url: "url" }],
        },
      },
    });

    const result = await fetchTypeData("https://pokeapi.co/type/electric");
    expect(result.damage_relations.double_damage_from[0].name).toBe("ground");
  });
});
