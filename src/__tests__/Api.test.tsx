import { describe, it, expect, vi, beforeEach } from "vitest";
import { fetchPokemonData, fetchTypeData } from "../lib/api";

vi.mock("../lib/http", () => ({
  default: {
    get: vi.fn(),
  },
}));

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
    const mockedGet = vi.mocked((await import("../lib/http")).default.get);
    mockedGet.mockResolvedValueOnce({
      data: {
        name: "electric",
        damage_relations: {
          double_damage_from: [{ name: "ground", url: "url" }],
          double_damage_to: [],
          half_damage_from: [],
          half_damage_to: [],
          no_damage_from: [],
          no_damage_to: [],
        },
      },
    });

    const result = await fetchTypeData("https://pokeapi.co/type/electric");
    expect(result.damage_relations.double_damage_from[0].name).toBe("ground");
  });
});
