import { describe, it, expect, vi, beforeEach } from "vitest";
import * as api from "../lib/api";
import axiosInstance from "../lib/http";
import axios from "axios";

vi.mock("../lib/http", () => ({
  default: {
    get: vi.fn(),
  },
}));

vi.mock("axios");

describe("API functions", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("fetchPokemonData should return correct data", async () => {
    axiosInstance.get.mockResolvedValueOnce({
      data: { name: "pikachu", id: 25 },
    });

    const data = await api.fetchPokemonData("Pikachu");

    expect(data).toEqual({ name: "pikachu", id: 25 });
    expect(axiosInstance.get).toHaveBeenCalledWith(
      "https://pokeapi.co/api/v2/pokemon/pikachu",
    );
  });

  it("fetchTypeData should return correct type data", async () => {
    axios.get.mockResolvedValueOnce({
      data: {
        damage_relations: {
          double_damage_from: [{ name: "ground" }, { name: "rock" }],
        },
      },
    });

    const result = await api.fetchTypeData(
      "https://pokeapi.co/api/v2/type/electric",
    );

    expect(result.damage_relations.double_damage_from).toHaveLength(2);
    expect(result.damage_relations.double_damage_from[0].name).toBe("ground");
  });
});
