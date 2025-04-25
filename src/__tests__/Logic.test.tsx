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
      },
    });

    const result = await getPokemonWeaknesses(["electric"]);
    expect(result).toEqual(expect.arrayContaining(["ground", "rock"]));
  });

  it("merges weaknesses for multiple types without duplicates", async () => {
    mockFetchTypeData
      .mockResolvedValueOnce({
        damage_relations: {
          double_damage_from: [{ name: "ground" }, { name: "rock" }],
        },
      })
      .mockResolvedValueOnce({
        damage_relations: {
          double_damage_from: [{ name: "fire" }, { name: "rock" }],
        },
      });

    const result = await getPokemonWeaknesses(["electric", "bug"]);
    expect(result).toEqual(expect.arrayContaining(["ground", "rock", "fire"]));
    expect(result.filter((v) => v === "rock")).toHaveLength(1); // Ei duplikaattia
  });

  it("returns empty array if no types provided", async () => {
    const result = await getPokemonWeaknesses([]);
    expect(result).toEqual([]);
  });

  it("throws error if fetchTypeData fails", async () => {
    mockFetchTypeData.mockRejectedValueOnce(new Error("API fail"));

    await expect(getPokemonWeaknesses(["electric"])).rejects.toThrow(
      "API fail",
    );
  });
});
