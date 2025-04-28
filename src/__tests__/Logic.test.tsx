import { describe, it, expect, vi, beforeEach } from "vitest";
import { getPokemonWeaknesses } from "../lib/logic";
import * as api from "../lib/api";

vi.mock("../lib/api", () => ({
  fetchTypeData: vi.fn(),
}));

const mockFetchTypeData = api.fetchTypeData as unknown as jest.Mock;

describe("getPokemonWeaknesses", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns weaknesses for a single type", async () => {
    mockFetchTypeData.mockResolvedValueOnce({
      damage_relations: {
        double_damage_from: [{ name: "ground" }, { name: "rock" }],
        half_damage_from: [],
        no_damage_from: [],
      },
    });

    const result = await getPokemonWeaknesses(["electric"]);
    expect(result.doubleWeaknesses).toEqual(
      expect.arrayContaining(["ground", "rock"]),
    );
    expect(result.quadrupleWeaknesses).toEqual([]);
  });

  it("merges weaknesses for multiple types without duplicates", async () => {
    mockFetchTypeData
      .mockResolvedValueOnce({
        damage_relations: {
          double_damage_from: [{ name: "ground" }, { name: "rock" }],
          half_damage_from: [],
          no_damage_from: [],
        },
      })
      .mockResolvedValueOnce({
        damage_relations: {
          double_damage_from: [{ name: "fire" }, { name: "rock" }],
          half_damage_from: [],
          no_damage_from: [],
        },
      });

    const result = await getPokemonWeaknesses(["electric", "bug"]);
    expect(result.doubleWeaknesses).toEqual(
      expect.arrayContaining(["ground", "fire"]),
    ); // "rock" pois täältä
    expect(result.quadrupleWeaknesses).toEqual(
      expect.arrayContaining(["rock"]),
    ); // "rock" tänne
  });

  it("returns empty arrays if no types provided", async () => {
    const result = await getPokemonWeaknesses([]);
    expect(result).toEqual({ doubleWeaknesses: [], quadrupleWeaknesses: [] });
  });

  it("throws error if fetchTypeData fails", async () => {
    mockFetchTypeData.mockRejectedValueOnce(new Error("API fail"));

    await expect(getPokemonWeaknesses(["electric"])).rejects.toThrow(
      "API fail",
    );
  });

  it("identifies quadruple weaknesses correctly", async () => {
    mockFetchTypeData
      .mockResolvedValueOnce({
        damage_relations: {
          double_damage_from: [{ name: "electric" }],
          half_damage_from: [],
          no_damage_from: [],
        },
      })
      .mockResolvedValueOnce({
        damage_relations: {
          double_damage_from: [{ name: "electric" }],
          half_damage_from: [],
          no_damage_from: [],
        },
      });

    const result = await getPokemonWeaknesses(["water", "flying"]);
    expect(result.doubleWeaknesses).toEqual([]);
    expect(result.quadrupleWeaknesses).toEqual(
      expect.arrayContaining(["electric"]),
    );
  });
});
